import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <Wrapper><Button onClick={() => loginWithRedirect()}>Log In</Button></Wrapper>;
};

const Wrapper = styled.div`
  padding: 5px;
  margin: 0px 12px;
  margin-bottom: -2px;
  font-size: 20px;
  background: var(--color-main);
  color:white;
  border-radius:3px;
  cursor: pointer;


  border-bottom: 3px solid var(--color-main);
  border-image: 0;
  transition: color 0.5s;

  &:hover {
    color: var(--color-dark);
    border-bottom: 3px solid var(--color-main);
    border-image: linear-gradient(
        to right,
        var(--color-main),
        var(--color-dark) 30%,
        var(--color-dark) 60%,
        var(--color-main)
      )
      1;
  }
  &:active {
    color: white;
  }

`;
const Button = styled.a`
color:inherit;
`;
export default LoginButton;
