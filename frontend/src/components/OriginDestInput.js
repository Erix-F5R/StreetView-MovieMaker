import styled from "styled-components";
import { useState, useContext } from "react";
import { MapFlowContext } from "../MapFlow/MapFlowContext";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleInput from "./GoogleInput";

import { FiPlay } from "react-icons/fi";

//New Trip Inputs and Go/View Trip buttons
const OriginDestInput = ({ dispatch }) => {
  const [originDestination, setOriginDestination] = useState({});
  const {
    state: { status },
    actions: { receivedOriginDestination },
  } = useContext(MapFlowContext);


  const handleChangeO = (event) => {
    setOriginDestination({ ...originDestination, 'origin': event.label });
  };

  const handleChangeD = (event) => {
    setOriginDestination({ ...originDestination, 'destination': event.label });
  };

  const submitInputs = (event) => {
    event.preventDefault();
    receivedOriginDestination(originDestination);
  };

  return (
    <Container>
      <InputWrapper>
        <GoogleInput handleChange={handleChangeO} pHolder={"Origin"}/>
        <GoogleInput handleChange={handleChangeD} pHolder={"Destination"}/>
      </InputWrapper>
      <ButtonWrapper>
        <Button onClick={submitInputs}>
          {status === "idle" ||
          status === "save" ||
          status === "path-received" ? (
            "Go"
          ) : (
            <CircularProgress sx={{ color: " #16697A" }} />
          )}
        </Button>
        <ButtonPlay
          onClick={() => dispatch({ type: "open-video" })}
          disabled={status !== "path-received" && status !== "save"}
        >
          View Trip <FiPlay />
        </ButtonPlay>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;

`;

const ButtonWrapper = styled.div`
  display: flex;
  padding-top: 5px;
`;

const InputWrapper = styled.div`
  width: 100%;
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

const Button = styled.button`
  padding: 4px 8px;
  margin-left: 12px;
  min-width: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
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

const ButtonPlay = styled(Button)`
  background: var(--color-dark);
  border: 1px solid var(--color-dark);
  padding-left: 10px;
  min-width: 220px;

  &:disabled {
    background: var(--color-dark-disabled);
    color: lightgrey;
  }

  &:hover:enabled {
    color: var(--color-main);
    border: 1px double var(--color-main);
  }
`;

export default OriginDestInput;
