import * as React from "react";
import Modal from "@mui/material/Modal";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import useInterval from "../hooks/useInterval";

const ModalTest = () => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [play, setPlay] = useState("Play");

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setCount(0);
    setOpen(false);
    setPlay("Play");
  };

  const handlePlayPauseReset = () => {
    if (play === "Play") {
      setPlay("Pause");
    } else if (play === "Pause") {
      setPlay("Play");
    } else if (play === "Reset") {
      setPlay("Pause");
    }
  };

  const images = [
    "streetview.jpeg",
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
  ];

  useInterval(
    () => {
      count === images.length - 1 ? setPlay("Reset") : setCount(count + 1);
    },
    play === "Pause" ? 1000 : null
  );

  return (
    <>
      <div>Modal Test</div>
      <button onClick={handleOpen}>Open modal</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <img
            style={{ height: "400px", width: "400px" }}
            src={require("../assets/" + `${images[count % images.length]}`)}
          />
          <ButtonWrapper>
          <button onClick={handlePlayPauseReset}>{play}</button>
          <button>Rate This Trip</button>
          </ButtonWrapper>
        </Container>
      </Modal>
    </>
  );
};

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 10px;
  background: white;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  border: 2px solid #000;
  box-shadow: 24;
`;

const ButtonWrapper = styled.div``;

export default ModalTest;
