import styled from "styled-components";
import { useState, useContext } from "react";
import { MapFlowContext } from "../MapFlow/MapFlowContext";
import {FiPlay} from "react-icons/fi"

const OriginDestInput = (type) => {
  const [originDestination, setOriginDestination] = useState({});
  const {
    actions: { receivedOriginDestination , launchModal },
  } = useContext(MapFlowContext);

  const handleChange = (key, val) => {
    setOriginDestination({ ...originDestination, [key]: val });
  };

  const submitInputs = (event) => {
    event.preventDefault();
    receivedOriginDestination(originDestination);
  };

  return (
    <Container>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Origin"
          onChange={(event) => handleChange("origin", event.target.value)}
        />
        <Input
          type="text"
          placeholder="Destination"
          onChange={(event) => handleChange("destination", event.target.value)}
        />
      </InputWrapper>
      <ButtonWrapper>
        <Button onClick={submitInputs}>Go!</Button>
        <ButtonPlay onClick={ () => launchModal()}>View Trip <FiPlay/></ButtonPlay>
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
`;

const InputWrapper = styled.div``;

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
  padding: 5px;
  margin-left: 12px;
  min-width: 64px;
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

  &:hover {
    color: var(--color-main);
    border: 1px double var(--color-main);
  }

`;

export default OriginDestInput;
