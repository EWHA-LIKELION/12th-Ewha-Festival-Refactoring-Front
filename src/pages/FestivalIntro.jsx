import React, { useState, useEffect } from "react";
import styled from "styled-components";
import background from "../images/background.png";
import HeaderBackVer from "../components/HeaderBackVer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LiberEwhaLogo from "../images/LiberEwhaLogo.svg";

function FestivalIntro() {
  return (
    <Wrapper>
      <HeaderBackVer style={{ zInex: 2 }} />
      <Container>
        <img src={LiberEwhaLogo} />
        <Title>
          이화, 해방하다
          <p>LIBER : 라틴어로 ‘자유롭다, 해방하다’</p>
        </Title>
        <TextBox>
          <h1>해방 :</h1>
          <h2>
            이화인 한 명 한 명이 모여
            <br />
            하나의 이화로
          </h2>
          <Content>
            각자의 삶으로 숨가쁘게 살아가면서
            <br /> 우리는 가끔 서로를 잊곤 합니다.
            <br />
            이화여자대학교라는 공동체 안에서,
            <br /> 15,000 이화인 중 한명으로 살아가면서
            <br /> 우리 모두가 ‘이화인’임을 잊어버리게 될 때도 있습니다.
            <br />
            이번 138주년 대동제에서는 부스 운영부터
            <br /> 영화제, 아티스트 공연 등 모두가 하나되어 즐기고
            <br /> 3일 동안 함께 교류하며 해방이라는
            <br /> 이름 아래 ‘이화’임을 되새기는 시간을 갖고자 합니다.
          </Content>
        </TextBox>
        <TextBox>
          <h1>해방 :</h1>
          <h2>
            부담과 걱정을 잠시 내려놓은
            <br /> 즐거운 축제로
          </h2>
          <Content>
            대학생으로서 그리고 개개인의 삶을 짊어진 사람으로서
            <br /> 우리는 여러 책임을 갖고 살아갑니다. <br />
            어쩌면 그 무게가 너무 무겁기도,
            <br /> 버겁기도 할 때가 있을 것입니다. <br />
            이번 138주년 대동제는 그 무게를 잠시 내려놓고
            <br />
            모두가 즐길 수 있는 축제로 만들고자 합니다. <br />
            부스 운영부터 영화제, 아티스트 공연 등 <br />
            모두가 하나되어 즐길 수 있는 자리를 만들고자 합니다.
          </Content>
        </TextBox>
        <TextBox>
          <h1>해방 :</h1>
          <h2>기존에서 나아가 새로운 대동제로</h2>
          <Content>
            기존의 정형화된 행사에서 벗어나
            <br /> 더 많은 이화인과 함께하며 행사들을 되살리고 <br />
            이화인이 함께 새롭게 꾸려가는 <br />
            해방이화만의 문화를 만들고자 합니다. <br />
            이에 이번 138주년 대동제에서는 <br />
            이화인이 함께 새로운 문화를 만들어가는 <br />
            여러 프로그램들이 운영되는 축제를 만들고자 합니다.
          </Content>
        </TextBox>
      </Container>
    </Wrapper>
  );
}

export default FestivalIntro;

const Wrapper = styled.div`
  /* height: calc(var(--vh, 1vh) * 100); */
  background-image: url(${background});
  background-repeat: repeat-y;
  margin: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin: 44px 0 46px 0;
  }
`;

const Title = styled.div`
  color: var(--wh01, var(--wh, #fff));
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  p {
    color: var(--wh01, var(--wh, #fff));
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 10px 0 37px 0;
  }
`;

const TextBox = styled.div`
  width: 345px;
  max-height: 319px;
  flex-shrink: 0;
  border-radius: 15px;
  background: rgba(217, 217, 217, 0.2);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 0;
  margin-bottom: 30px;
  justify-content: center;
  padding-bottom: 30px;
  h1 {
    color: var(--wh01, var(--wh, #fff));
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 30px 0 10px 0;
  }
  h2 {
    color: var(--wh01, var(--wh, #fff));
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0;
  }
`;

const Content = styled.div`
  color: var(--wh01, var(--wh, #fff));
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 298px;
  max-height: 153px;
  margin-top: 30px;
`;
