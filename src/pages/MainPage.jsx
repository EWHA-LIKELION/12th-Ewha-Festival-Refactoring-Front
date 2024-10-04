import React from "react";
import styled from "styled-components";
import background from "../images/background.png";
import MainHeader from "../components/MainHeader";

const MainPage = () => {
  return (
    <Wrapper>
      <MainHeader />
      <Title>
        2024
        <br />
        이화여대 대동제
      </Title>
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

const Title = styled.div`
  color: #ffffff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.625rem; /* 108.333% */
  letter-spacing: -0.03125rem;
  margin-top: 3rem;
`;
