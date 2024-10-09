import React, { useState, useEffect } from "react";
import styled from "styled-components";
import background from "../images/background.png";
import BarrierFreeHeader from "../components/BarrierFreeHeader";
import { useNavigate } from "react-router-dom";
import BarrierFreeMap from "../images/BarrierFreeMap.svg";
import Footer from "../components/Footer";

function BarrierFreeInfo() {
  return (
    <Wrapper>
      <BarrierFreeHeader />
      <Container>
        <Title>배리어프리 확인하기</Title>
        <img src={BarrierFreeMap} />
        <p>본좌석은 베리어프리 좌석입니다.</p>
      </Container>
      <TextBox>
        <div>
          해방이화 (준)축제준비위원회에서는
          <br /> 더 많은 이화인들이 축제를 즐길 수 있는 환경을
          <br /> 제공하고자 합니다.
          <br /> <br /> 이에 휠체어 이용자, 혹은 이용자가 아니더라도
          <br /> 별도 공간이 필요하신 분들을 위해
          <br /> 본 무대에서 배리어프리석을 마련하고,
          <br /> 속기사를 지원하고 있습니다.
          <br /> <br /> 배리어프리석의 위치는 다음의 그림과 같이
          <br /> 본무대 공연 좌석 좌측 앞으로 마련해두었습니다.
          <br /> <br /> 이에, 배리어프리석을 희망하시는 분들께서는
          <br /> 본 무대 공연 앞쪽 출입구를 통해
          <br /> 입장해주시면 감사하겠습니다.
        </div>
      </TextBox>
      <Footer />
    </Wrapper>
  );
}

export default BarrierFreeInfo;

const Wrapper = styled.div`
  /* height: calc(var(--vh, 1vh) * 100); */
  background-image: url(${background});
  background-repeat: repeat-y;
  margin: 0;
`;

const Container = styled.div`
  margin: 0 35px;
  p {
    color: var(--wh01, var(--wh, #fff));
    text-align: center;
    font-family: Pretendard;
    font-size: 11px;
    font-style: normal;
    font-weight: 700;
    line-height: 26px; /* 260% */
    letter-spacing: -0.5px;
    margin: 0;
  }
  img {
    max-width: 80vw;
    max-height: 232px;
    object-fit: cover;
  }
`;

const Title = styled.div`
  color: var(--wh01, var(--wh, #fff));
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px; /* 108.333% */
  letter-spacing: -0.5px;
  width: 188px;
  margin: 37px 0 29px 0;
`;

const TextBox = styled.div`
  margin-top: 19px;
  padding: 36px 35px;
  max-width: 319px;
  height: 456px;
  flex-shrink: 0;
  border: 1px solid var(--gray01, #bbb);
  background: var(--wh02, rgba(251, 251, 251, 0.3));
  box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.25) inset;
  /* backdrop-filter: blur(2px); */
  div {
    color: var(--wh01, var(--wh, #fff));
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
