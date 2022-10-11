import styled from "styled-components";

//All trips filter radio button styling, mostly
const RadioButton = ({ category, option, filterValue, handleClick }) => {
  return (
    <Wrapper>
      <Input
        type="radio"
        value={`${category}=${option}`}
        name="filter"
        checked={filterValue === option}
        onChange={(event) => handleClick(event)}
      />
      <Label>{option}</Label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 2px 0px;
`;

const Label = styled.label`
  color: var(--color-dark);
  &:hover {
    color: var(--color-main);
  }
`;

const Input = styled.input`
  appearance: none;
  border-radius: 50%;
  width: 13px;
  height: 13px;
  transition: 0.2s all linear;
  border: 2px solid var(--color-dark);

  &:checked{
    border: 5px solid var(--color-main);
  }
`;
export default RadioButton;
