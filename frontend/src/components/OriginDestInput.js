import styled from "styled-components";

const OriginDestInput = (type) => {
  return (
    <>
      <Input type="text" placeholder="Origin" />
      <Input type="text" placeholder="Destination" />
    </>
  );
};

const Input = styled.input``;

export default OriginDestInput;
