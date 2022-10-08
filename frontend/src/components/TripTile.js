import styled from "styled-components";

const TripTile = ({ trip }) => {
  console.log(trip);

  return (
    <Container>
      <TitleWrapper>
        <Label>{trip.formData.label} </Label>
        <Author>{trip.author}</Author>
      </TitleWrapper>
      <Difficulty>
        {trip.formData.difficulty} {trip.distance}
      </Difficulty>
      <Location>
        {trip.formData.locality} {trip.formData.country}{" "}
      </Location>
      <ImgWrapper>
        <Image
          src={require("../assets/thumbnails/" + `${trip.imgName}` + ".png")}
        />
      </ImgWrapper>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid black;
`;

const TitleWrapper = styled.div`
  border: 1px solid black;
`;
const Label = styled.div`
  border: 1px solid black;
`;
const Author = styled.div`
  border: 1px solid black;
`;

const Difficulty = styled.div`
  border: 1px solid black;
`;
const Location = styled.div`
  border: 1px solid black;
`;

const ImgWrapper = styled.div`
  border: 1px solid red;

`;

const Image = styled.img`

  border: 1px solid blue;


`;

export default TripTile;
