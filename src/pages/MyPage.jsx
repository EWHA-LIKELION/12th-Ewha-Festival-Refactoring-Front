import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";
import Header from "../components/Header";
import MyPageScrap from "../components/MyPageScrap";

import bookMark from "../images/bookMark.svg";

const MyPage = () => {
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user_id");
    localStorage.removeItem("nickname");

    navigate("/");
  };

  return (
    <Wrapper>
      <Header />
      <Content>
        <Ment>마이페이지</Ment>
        <NameWrapper>
          <Name>{nickname} 님</Name>
          <Logout onClick={handleLogout}>로그아웃</Logout>
        </NameWrapper>
        <MyPageScrap />
      </Content>
    </Wrapper>
  );
};
export default MyPage;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Ment = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 37px;
  margin-bottom: 30px;
`;

const NameWrapper = styled.div`
  display: flex;
  width: 330px;
  height: 87px;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  border: 1px solid var(--gray03, #f7f7f7);
  background: linear-gradient(
    158deg,
    rgba(67, 255, 153, 0.4) 3.91%,
    rgba(247, 247, 247, 0.4) 102.63%
  );
`;

const Name = styled.div`
  color: #006c31;
  font-size: 18px;
  font-weight: 600;
  margin-left: 28px;
`;

const Logout = styled.button`
  color: var(--gray05, #8e8e8e);
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.5px;
  text-decoration-line: underline;
  cursor: pointer;
  border-style: none;
  outline: none;
  background: none;
  margin-right: 21px;
`;

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #03d664;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  margin-top: 209px;

  img {
    width: 43px;
  }
`;