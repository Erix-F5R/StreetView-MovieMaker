import * as React from "react";
import Modal from "@mui/material/Modal";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import useInterval from "../hooks/useInterval";

const ModalTest = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const images = ['a','b','c','d','e','f','g','h']

  let [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

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
        <Div>{images[count % (images.length) ]}</Div>
      </Modal>
    </>
  );
};

const Div = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border: 2px solid #000;
  box-shadow: 24;
`;

export default ModalTest;
