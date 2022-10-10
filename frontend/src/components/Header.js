import styled from "styled-components";
import { Link } from "react-router-dom";
import AuthNav from "../auth/AuthNav";
import SignupButton from "../auth/SignupButton";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const Header = () => {
  const user = useContext(CurrentUserContext);


  return (
    <Wrapper>
      <Home to={"/"}>Route+Viewer</Home>
      <Click to={"/new-trip"}>+ New Trip</Click>
      <Click to={"/all-trips"}>All Trips</Click>
      {user ? <Click to={"/profile"}>{user.username}</Click> : <SignupButton />}
      <AuthNav />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  margin: 10px 0px;
  border-bottom: 3px solid var(--color-main);

  display: flex;

  align-items: end;
`;

const Home = styled(Link)`
  flex-grow: 1;
  margin-bottom: -2.5px;
  padding-bottom: 5px;
  font-size: 30px;
  border-bottom: 3px solid var(--color-main);
  border-image: 0;
  color: var(--color-main);
  transition: color 0.5s;

  &:hover {
    color: var(--color-dark);
    border-bottom: 3px solid var(--color-main);
    border-image: linear-gradient(
        to right,

        var(--color-dark) 10%,
        var(--color-main) 20%
      )
      1;
  }
`;

const Click = styled(Link)`
  margin-right: 48px;
  font-size: 24px;
  margin-bottom: -2.5px;
  color: var(--color-main);
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
`;

export default Header;
