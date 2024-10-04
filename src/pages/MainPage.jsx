import React from "react";
import styled from "styled-components";
import background from "../images/background.png";
import MainHeader from "../components/MainHeader";

const MainPage = () => {
  return (
    <Wrapper>
      <MainHeader />
    </Wrapper>
  );
};

console.log("Base URL:", process.env.REACT_APP_SERVER_PORT);

export default MainPage;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  background-image: url(${background});
  margin: 0;
`;
