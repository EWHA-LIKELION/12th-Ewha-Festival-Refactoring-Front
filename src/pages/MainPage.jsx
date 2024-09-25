import React from "react";
import styled from "styled-components";
import background from "../images/background.png";
import Header from "../components/Header";

const MainPage = () => {
  return (
    <Wrapper>
      <Header />
    </Wrapper>
  );
};

export default MainPage;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  background-image: url(${background});
  margin: 0;
`;
