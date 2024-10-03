import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";

import loginImg from "../images/loginImg.svg";
import PwImg from "../images/PwImg.svg";
import kakaoLogin from "../images/kakaoLogin.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [ID, setID] = useState();
  const [PW, setPW] = useState();

  const pwInputRef = useRef(null);
  const idInputRef = useRef(null);

  const goLogin = async () => {
    if (!ID && !PW) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    if (!ID) {
      alert("아이디를 입력해주세요.");
      idInputRef.current.focus();
      return;
    }
    if (!PW) {
      alert("비밀번호를 입력해주세요.");
      pwInputRef.current.focus();
      return;
    }

    try {
      const response = await instance.post(
        `${process.env.REACT_APP_SERVER_PORT}/accounts/login`,
        {
          username: ID,
          password: PW,
        }
      );
      console.log(response.data);

      const { username, access_token, id } = response.data.data;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("username", username);
      localStorage.setItem("user_id", id);

      navigate("/");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <Wrapper>
      <Header />
      <Content>
        <Ment>로그인</Ment>
        <InputWrapper>
          <img src={loginImg} alt="로그인 이미지" />
          <input
            ref={idInputRef}
            placeholder="아이디"
            onChange={(e) => setID(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <img src={PwImg} alt="자물쇠 이미지" />
          <input
            ref={pwInputRef}
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPW(e.target.value)}
          />
        </InputWrapper>

        <LoginBtn onClick={goLogin}>로그인</LoginBtn>
        <KakaoBtn>
          <img src={kakaoLogin} alt="카카오 이미지" />
          카카오 로그인
        </KakaoBtn>
        <SignupBtn onClick={() => navigate("/signup")}>
          계정이 없다면? 회원가입 하러가기
        </SignupBtn>
      </Content>
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  color: #bbb;
  font-size: 12px;
  font-weight: 400;
  align-content: center;
  display: flex;
  align-items: center;
  width: 238px;
  height: 46px;
  background-color: #f5f5f5;
  border-radius: 12px;
  padding-left: 12px;
  margin-bottom: 15px;

  input {
    border-style: none;
    outline: none;
    background: none;
    padding-left: 10px;
  }

  img {
    width: 17px;
  }
`;

const Ment = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 37px;
  margin-bottom: 97px;
`;

const LoginBtn = styled.button`
  width: 250px;
  height: 46px;
  background-color: #1ef380;
  border-radius: 12px;
  text-align: center;
  align-content: center;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  border-style: none;
  outline: none;
  cursor: pointer;
  margin-top: 31px;
  margin-bottom: 15px;
`;

const KakaoBtn = styled.button`
  width: 250px;
  height: 46px;
  background-color: #fee500;
  border-radius: 12px;
  text-align: center;
  align-content: center;
  font-size: 14px;
  font-weight: 700;
  border-style: none;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  img {
    padding-right: 13px;
  }
`;

const SignupBtn = styled.button`
  font-size: 12px;
  color: #8e8e8e;
  text-decoration-line: underline;
  line-height: 26px;
  border-style: none;
  outline: none;
  background: none;
  cursor: pointer;
`;
