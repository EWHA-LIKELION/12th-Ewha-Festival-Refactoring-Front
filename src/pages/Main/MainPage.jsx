import React from "react";
import styled from "styled-components";
import background from "../../images/background.png";
import hashTag from "../../images/hashTag.svg";
import MainHeader from "../../components/MainHeader";
import MainModal from "../../components/MainModal";

const MainPage = () => {
  return (
    <Wrapper>
      <MainHeader />
      <Title>
        2024
        <br />
        이화여대 대동제
      </Title>
      <BeforeLoginBox>
        <SubTitle>로그인 하러가기</SubTitle>
        <P>
          로그인하면
          <br />
          사이트를 더 편하게
          <br />
          즐길 수 있어요🍀
        </P>
        <img src={hashTag} alt="hashTag" width={148} />
      </BeforeLoginBox>
      <NoticeBox>📣 ‘초록의 밤' 입장 공지</NoticeBox>
      <MainModal />
    </Wrapper>
  );
};

export default MainPage;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  background-image: url(${background});
  overflow: scroll;
  background-repeat: repeat-y;
  margin: 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const Title = styled.div`
  color: #ffffff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.625rem;
  letter-spacing: -0.03125rem;
  margin-top: 2rem;
`;

const BeforeLoginBox = styled.div`
  margin: 2.19rem auto 0;
  background: linear-gradient(
    158deg,
    rgba(67, 255, 153, 0.4) 3.91%,
    rgba(247, 247, 247, 0.4) 102.63%
  );
  aspect-ratio: 330 / 429;
  width: 77%;
  flex-shrink: 0;
  border-radius: 0.9375rem;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1), 0px 0px 4px 0px #fff inset;
  backdrop-filter: blur(10px);
  padding: 1.75rem 1.19rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const P = styled.p`
  color: white;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.0625rem;
  letter-spacing: -0.03125rem;
`;

const SubTitle = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.5rem 2rem;
  border-radius: 1.875rem;
  background: var(--purple, #9747ff);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
  color: white;
  font-family: Pretendard;
  font-size: 0.8125rem;
  font-weight: 700;
  line-height: 1.25rem;
  letter-spacing: -0.03125rem;
  cursor: pointer;
`;

const NoticeBox = styled.div`
  display: flex;
  width: 77%;
  flex-shrink: 0;
  margin: 1.62rem auto;
  padding: 0.3125rem 1.25rem;
  align-items: center;
  border-radius: 0.9375rem;
  background: linear-gradient(
    158deg,
    rgba(67, 255, 153, 0.4) 3.91%,
    rgba(247, 247, 247, 0.4) 102.63%
  );
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1), 0px 0px 4px 0px #fff inset;
  backdrop-filter: blur(10px);
  color: var(--wh01, var(--wh, #fff));
  font-family: Pretendard;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.0625rem;
  letter-spacing: -0.03125rem;
  cursor: pointer;
`;
