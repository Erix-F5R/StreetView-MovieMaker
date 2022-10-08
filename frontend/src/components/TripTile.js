import styled from "styled-components";
import { Link } from "react-router-dom";
const TripTile = ({ trip }) => {
  //The Thumbnails saved have a transparent padding of variable size
  //This is an un resolved bug in leaflet-easyprint

  return (
    <Container>
      <Linky to={`${trip._id}`}>
        <Label>{trip.formData.label} </Label>
        <Author>by {"pacific"}</Author>

      <Difficulty>
        Rated: {trip.formData.difficulty} <Span>({Math.floor(trip.distance/100)/10} km)</Span>
      </Difficulty>
      <Location>
        {trip.formData.locality}, {trip.formData.country}{" "}
      </Location>
      <ImgWrapper>
        <Image
          src={require("../assets/thumbnails/" + `${trip.imgName}` + ".png")}
        />
      </ImgWrapper>
      </Linky>
    </Container>
  );
};

const Linky = styled(Link)`
    color: inherit;
`

const Container = styled.div`
  border: 1px solid black;
  color: var(--color-dark);
  width: 25%;
  padding-left: 30px;
  margin: 30px;
  border: 3px solid var(--color-main);
  border-image: 0;
  transition: color 0.5s;

  &:hover {
    color: var(--color-main);
    border-bottom: 3px solid var(--color-main);
    border-image: linear-gradient(
        to right,

        var(--color-dark) 10%,
        var(--color-main) 50%
      )
      1;
  }

`;

const Label = styled.div`
  
  text-align: bottom;
  font-size: 20px;
  font-weight: bold;
  margin-top: 25px;
`;
const Author = styled.div`
 color: var(--color-main);
`;

const Difficulty = styled.div`
  margin-top: 10px;
  font-size: 16px;
`;

const Span = styled.span`
    margin-left: 20px;
    font-weight: bold;
`;

const Location = styled.div`

  
`;

const ImgWrapper = styled.div`
  margin-top: 25px;
`;

const Image = styled.img`

  width: 100%;
`;

export default TripTile;
