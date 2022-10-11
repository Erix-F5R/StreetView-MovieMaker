import banner from "../assets/banner.jpg";
import styled from "styled-components";

const Homepage = () => {
  const text = `Not all bike paths are created equal.\n Often a suggested bike route can turn into an arduous journey navigating highway overpasses, narrow shoulders and heavy traffic. Route+Viewer simplifies route planning by saving you the hassel of clicking down Google Streetview searching for obstacles. Enter an origin and destination and a film of the trip will be generatered for you.\n Save your route and share it with others!`;
  
  return (
    <Trim>
      <Gradient />
      <Banner src={banner} alt={"Banner of cyclists on a busy street"} /> 
      <Blurb>{text}</Blurb>
    </Trim>
  );
};

const Trim = styled.div``;

const Gradient = styled.div`
  width: 100vw;
  height: 150px;
  z-index: 2;
  background: linear-gradient(white, rgba(0, 0, 0, 0));
  position: relative;
`;

const Banner = styled.img`
  width: 100vw;
  height: 100%;
  z-index: 1;
  position: relative;
  margin-top: -150px;
`;

const Blurb = styled.div`
  white-space: pre-line;
  line-height: 1.2;
  word-spacing: 6px;
  text-align: center;
  width: 50vw;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 30px;
  background: white;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  border: 2px solid var(--color-main);
  box-shadow: 24;
  color: var(--color-dark);
  font-size: 20px;
  z-index: 2;
  box-shadow: 0 0 15px 15px var(--color-main-faded);
`;
export default Homepage;
