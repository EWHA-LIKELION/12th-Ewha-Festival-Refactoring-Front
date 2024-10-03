import React, { useState, useEffect } from "react";
import styled from "styled-components";
import background from "../images/background.png";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FestivalIntro() {
  return (
    <Wrapper>
      <Header />
      <Container>
        <img />
        <Title>
          이화, 해방하다
          <p>LIBER : 라틴어로 ‘자유롭다, 해방하다’</p>
        </Title>
        <TextBox>
          <SubTitle></SubTitle>
          <Content></Content>
        </TextBox>
      </Container>
    </Wrapper>
  );
}

export default FestivalIntro;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  background-image: url(${background});
  margin: 0;
`;

const Title = styled.div``;

const Container = styled.div``;

const SubTitle = styled.div``;

const Content = styled.div``;

const TextBox = styled.div``;
