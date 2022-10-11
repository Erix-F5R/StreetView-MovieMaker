import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

//Loading spinner used throughout the website
const Loading = () => {
  return (
    <Container>
      <CircularProgress  size={100} sx={{color: "#68B684" }} />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;  
  transform: translate(-50%, -50%);
  
`;
export default Loading;
