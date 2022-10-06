import styled from "styled-components";
import { useState, useContext } from "react";
import { MapFlowContext } from "../MapFlow/MapFlowContext";

const OriginDestInput = (type) => {
    const [originDestination, setOriginDestination] = useState({})
    const {actions: {receivedOriginDestination}} = useContext(MapFlowContext)

    const handleChange = ( key, val ) => {
        setOriginDestination({...originDestination, [key]: val});
    } 

    const submitInputs = (event) => {
        event.preventDefault();
        receivedOriginDestination(originDestination)
        
    }

  return (
    <>
      <Input type="text" placeholder="Origin" onChange={ (event) => handleChange('origin', event.target.value)} />
      <Input type="text" placeholder="Destination"  onChange={ (event) => handleChange('destination', event.target.value)} />
      <Button onClick={submitInputs}>Go!</Button>
    </>
  );
};

const Input = styled.input``;
const Button =styled.button``;

export default OriginDestInput;
