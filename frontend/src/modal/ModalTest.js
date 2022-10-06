import * as React from "react";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import useInterval from "../hooks/useInterval";
import { initialState, reducer } from "./ModalReducer";
import { FiRotateCw, FiPlay, FiPause } from "react-icons/fi";

const ModalTest = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const [barWidth, setBarWidth] = React.useState(0)

  const IconPack = { "Play" : <FiPlay/> , "Pause" : <FiPause/> , "Reset": <FiRotateCw/>}
  const images = [
    "streetview.jpeg",
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
  ];

  const formHandler = (key, value) => {};

  useInterval(
    () => {
      state.frame === images.length - 1
        ? dispatch({ type: "end-of-video" })
        : dispatch({ type: "frame-increment" });
      setBarWidth(Math.floor((state.frame+1) / images.length * 100))
    },
    state.playPauseReset === "Pause" ? 1000 : null
  );

  return (
    <>
      <div>Modal Test</div>
      <button onClick={() => dispatch({ type: "open-video" })}>
        Open modal
      </button>
      <Modal
        open={state.openVideo}
        onClose={() => dispatch({ type: "close-video" })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <img
            style={{ height: "400px", width: "400px" }}
            src={require("../assets/" +
              `${images[state.frame % images.length]}`)}
          />

          <ProgressBar>
            <ProgressFill style={{width: `${barWidth}%`}}/>
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

      <Modal
        open={state.openRate}
        onClose={() => dispatch({ type: "close-rate" })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>

          <Form>
          <Label> Trip Title
            <Input
              type="text"
              name="label"
              onChange={(event) =>
                dispatch({
                  type: "form-change",
                  input: { label: event.target.value },
                })
              }
            /></Label>
          <CCWraper>
            <Label> City
            <Input
              type="text"
              name="city"
              style={{width: '80%'}}
              value={state.formData.city}
              onChange={(event) =>
                dispatch({
                  type: "form-change",
                  input: { city: event.target.value },
                })
              }
            /></Label>

            <Label> Country
            <Input
              type="text"
              name="country"
              onChange={(event) =>
                dispatch({
                  type: "form-change",
                  input: { country: event.target.value },
                })
              }
            /></Label>
            </CCWraper>

            <Label> Select Difficulty: 
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
            <Label> Notes
            <Textarea
              name="notes"
              onChange={(event) =>
                dispatch({
                  type: "form-change",
                  input: { notes: event.target.value },
                })
              }
            />
            <Submit type="submit" value="Save!" onClick={(e) => {e.preventDefault(); window.alert('Saved to Account')}} />
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
  color: var(--color-dark)
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin-top: 5px;
  border: 1px solid var(--color-dark);
  border-radius: 2px;
  font-size: 18px;
  color: var(--color-dark)

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

const Submit = styled.input`
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
  background: var(--color-dark)
`;

const ProgressFill = styled.div`
  height: 100%;
  background: var(--color-main)

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

export default ModalTest;
