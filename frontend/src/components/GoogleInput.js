import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import styled from "styled-components";

const GoogleInput = ({ handleChange, pHolder }) => {
  const KEY = process.env.REACT_APP_GOOGLE_KEY;
  return (
    <>
      <Autocomplete
        apiKey={KEY}
        selectProps={{
          styles: {
            input: (provided) => ({
              ...provided,
              color: "#16697A",
              fontSize: "18px",
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              display: "none",
            }),
            loadingIndicator: (provided) => ({
              ...provided,
              visibility: "hidden",
            }),
            control: (provided, state) => ({
              ...provided,
              position: "relative",
              zIndex: "2",
              marginTop: "5px",
              width: "100%",
              display: "block",
              height: "24px",
              border: state.isFocused
                ? "2px solid #68B684"
                : "1px solid #16697A",
              borderRadius: "2px",
              boxShadow: state.isFocused ? 0 : 0,
              "&:hover": {
                border: state.isFocused
                  ? "2px solid #68B684"
                  : "1px solid #16697A",
              },
            }),
            placeholder: (provided) => ({
              ...provided,
              fontSize: "16px",
            }),

            option: (provided) => ({
              ...provided,
              color: "#16697A",
              fontSize: "18px",
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "#16697A",
              fontSize: "18px",
            }),
          },

          onChange: handleChange,
          placeholder: pHolder,
        }}
      />
    </>
  );
};

const Autocomplete = styled(GooglePlacesAutocomplete)`
  ::placeholder {
    color: red;
  }
`;

export default GoogleInput;
