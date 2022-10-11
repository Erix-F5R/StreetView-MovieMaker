import * as React from "react";
import { useReducer, useState, useContext, useEffect } from "react";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import useInterval from "../hooks/useInterval";

import { FiRotateCw, FiPlay, FiPause } from "react-icons/fi";
import { MapFlowContext } from "../MapFlow/MapFlowContext";
import StreetViewBuilder from "../MapFlow/StreetViewBuilder";
import CircularProgress from "@mui/material/CircularProgress";

//This component is two modals, one to view the trip and a second with a form to rate the trip
//The states are managed by ModalReducer.js
const ModalTrip = ({ state, dispatch }) => {
  const {
    state: { status, country, locality, label, pathBearing },
    actions: { saveTrip },
  } = useContext(MapFlowContext);

  const [images, setImages] = useState([]);

  //Grab the Streetview src's
  //Init the form with prefilled values for the user to edit if needed
  useEffect(() => {
    if (status === "path-received") {
      dispatch({
        type: "init-formData",
        data: { country: country, label: label, locality: locality },
      });
      setImages(StreetViewBuilder(pathBearing));
    }
  }, [status]);

  //ProgressBar util state
  const [barWidth, setBarWidth] = useState(0);
  const IconPack = {
    Play: <FiPlay />,
    Pause: <FiPause />,
    Reset: <FiRotateCw />,
  };

  //I added a timeout to the save to give the user some feedback
  //Make them feel like they did some work by clicking the button
  const handleSave = (event) => {
    event.preventDefault();
    saveTrip(state.formData);
    const timeout = setTimeout(() => {
      dispatch({ type: "close-rate" });
      clearTimeout(timeout);
    }, 3000);
  };

  //Google won't allow saving their images so the movie is faked using intervals
  //setInterval behaves irregularly with react
  //https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  useInterval(
    () => {
      state.frame === images.length - 1
        ? dispatch({ type: "end-of-video" })
        : dispatch({ type: "frame-increment" });
      setBarWidth(Math.floor(((state.frame + 1) / images.length) * 100));
    },
    state.playPauseReset === "Pause" ? 1000 : null
  );

  return (
    <>
      {/* First Modal (Movie)*/}
      <Modal
        open={state.openVideo}
        onClose={() => dispatch({ type: "close-video" })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <img
            style={{ height: "400px", width: "400px" }}
            src={images[state.frame % images.length]}
            // src={require("../assets/" +
            //   `${images[state.frame % images.length]}`)}
          />

          <ProgressBar>
            <ProgressFill style={{ width: `${barWidth}%` }} />
          </ProgressBar>

          <ButtonWrapper>
            <PlayButton
              onClick={() => dispatch({ type: "play-pause-reset-video" })}
            >
              {IconPack[state.playPauseReset]}
            </PlayButton>
            <RateButton onClick={() => dispatch({ type: "rate-this-trip" })}>
              Rate This Trip
            </RateButton>
          </ButtonWrapper>
        </Container>
      </Modal>

      {/* Second Modal (Form)*/}
      <Modal
        open={state.openRate}
        onClose={() => dispatch({ type: "close-rate" })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <Form>
            <Label>
              {" "}
              Trip Title
              <Input
                type="text"
                name="label"
                value={state.formData.label}
                onChange={(event) =>
                  dispatch({
                    type: "form-change",
                    input: { label: event.target.value },
                  })
                }
              />
            </Label>
            <CCWraper>
              <Label>
                {" "}
                City
                <Input
                  type="text"
                  name="city"
                  style={{ width: "80%" }}
                  value={state.formData.locality}
                  onChange={(event) =>
                    dispatch({
                      type: "form-change",
                      input: { locality: event.target.value },
                    })
                  }
                />
              </Label>

              <Label>
                {" "}
                Country
                <Input
                  type="text"
                  name="country"
                  value={state.formData.country}
                  onChange={(event) =>
                    dispatch({
                      type: "form-change",
                      input: { country: event.target.value },
                    })
                  }
                />
              </Label>
            </CCWraper>

            <Label>
              {" "}
              Select Difficulty:
              <Select
                onChange={(event) =>
                  dispatch({
                    type: "form-change",
                    input: { difficulty: event.target.value },
                  })
                }
              >
                <option value="">---</option>
                <option value="accessible">Accessible</option>
                <option value="easy">Easy</option>
                <option value="intermediate">Intermediate</option>
                <option value="dangerous">Dangerous</option>
              </Select>
            </Label>
            <Label>
              {" "}
              Notes
              <Textarea
                name="notes"
                onChange={(event) =>
                  dispatch({
                    type: "form-change",
                    input: { notes: event.target.value },
                  })
                }
              />
              <Submit type="submit" onClick={(e) => handleSave(e)}>
                {status === "save" ? <CircularProgress sx={{ color: " #16697A" }}/> : "Save"}
              </Submit>
            </Label>
          </Form>
        </Container>
      </Modal>
    </>
  );
};

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 10px;
  background: white;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  border: 2px solid var(--color-main);
  box-shadow: 24;
  color: var(--color-dark);
  font-size: 24px;
`;

const Form = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  padding-right: 15px;
`;

const Select = styled.select`
  font-size: 18px;
  background: white;
  border: 1px solid var(--color-dark);
  border-radius: 2px;
  width: 100%;
  margin: 5px 0px;
  color: var(--color-dark);
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin-top: 5px;
  border: 1px solid var(--color-dark);
  border-radius: 2px;
  font-size: 18px;
  color: var(--color-dark);
`;

const Label = styled.label`
  display: block;
  margin: 10px 0px;
`;
const Textarea = styled.textarea`
  display: block;
  width: 100%;
  font-size: 18px;
  border: 1px solid var(--color-dark);
  border-radius: 2px;
  height: 150px;
  color: var(--color-dark);
`;

const Submit = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 25%;
  padding: 5px 15px;
  margin: 12px 0px;
  font-size: 24px;
  background: var(--color-main);
  color: white;
  border-radius: 3px;
  cursor: pointer;

  border: 1px solid var(--color-main);

  transition: color 0.5s;

  &:hover {
    color: var(--color-dark);
    border: 1px double var(--color-dark);
  }
  &:active {
    color: white;
  }
`;

const CCWraper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProgressBar = styled.div`
  width: 400px;
  height: 4px;
  background: var(--color-dark);
`;

const ProgressFill = styled.div`
  height: 100%;
  background: var(--color-main);
`;

const PlayButton = styled.button`
  padding: 5px;
  margin: 0px 12px;
  min-width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  background: var(--color-dark);
  color: white;
  border-radius: 3px;
  cursor: pointer;

  border: 1px solid var(--color-dark);

  transition: color 0.5s;

  &:hover {
    color: var(--color-main);
    border: 1px double var(--color-main);
  }
  &:active {
    color: white;
  }
`;

const RateButton = styled.button`
  padding: 5px 15px;
  margin: 0px 12px;

  font-size: 30px;
  background: var(--color-main);
  color: white;
  border-radius: 3px;
  cursor: pointer;

  border: 1px solid var(--color-main);

  transition: color 0.5s;

  &:hover {
    color: var(--color-dark);
    border: 1px double var(--color-dark);
  }
  &:active {
    color: white;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 6px;
`;

export default ModalTrip;
