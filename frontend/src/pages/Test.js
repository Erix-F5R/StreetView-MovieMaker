import React from "react";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import styled from "styled-components";
const KEY = process.env.REACT_APP_GOOGLE_KEY;

const Test = () => {
  const [originDestination, setOriginDestination] = useState({});
  const handleChange = (event, key) => {
    setOriginDestination({ ...originDestination, [key]: event.target.value });
  };

  const testChange = (event) => {
    console.log(event.label, "origin");
  };
  console.log(originDestination);
  //onChange={(event) => handleChange("origin", event.target.value)

  return (
    <>
      <GooglePlacesAutocomplete
        apiKey={KEY}
        // style={{
        //   display: "block",
        //   width: "100%",
        //   marginTop: "5px",
        //   border: "1px solid #16697A",
        //   borderRadius: "2px",
        //   fontSize: "18px",
        //   color: "#16697A",
        // }}
        selectProps={{
          styles: {
            input: (provided) => ({
              ...provided,
              color: "#16697A",
              inputOnFocus: { borderColor: '#C0C0C0' },
            }),
            option: (provided) => ({
              ...provided,
              color: "#16697A",
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "#16697A",
            }),
          },

          onChange: testChange,
          placeholder: 'origin',
        }}
      />
    </>
  );
};

const Autocomplete = styled(GooglePlacesAutocomplete)`
  display: block;
  width: 100%;
  margin-top: 5px;
  border: 1px solid var(--color-dark);
  border-radius: 2px;
  font-size: 18px;
  color: var(--color-dark);

  &:active{

    border: 1px red solid;
  }
`;

export default Test;
