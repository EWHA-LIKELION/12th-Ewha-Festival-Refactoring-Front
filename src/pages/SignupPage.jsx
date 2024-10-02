import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";

import loginImg from "../images/loginImg.svg";
import PwImg from "../images/PwImg.svg";
import nickImg from "../images/nickImg.svg";
import check from "../images/check.svg";
import checkGreen from "../images/checkGreen.svg";

const SignupPage = () => {
  const navigate = useNavigate();
  const [ID, setID] = useState();
  const [PW, setPW] = useState();
  const [PWconfirm, setPWConfirm] = useState();
  const [name, setName] = useState("");

  const pwInputRef = useRef(null);
  const idInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const PwconfirmInputRef = useRef(null);

  const goSignup = async () => {
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
        `${process.env.REACT_APP_SERVER_PORT}/accounts/signup`,
        {
          username: ID,
          password: PW,
          nickname: name,
        }
      );
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다.");
    }
  };

  const checkIDDuplicate = async () => {
    if (!ID) {
      alert("아이디를 입력해주세요.");
      idInputRef.current.focus();
      return;
    }

    try {
      const response = await instance.post(
        `${process.env.REACT_APP_SERVER_PORT}/accounts/check-id`,
        { username: ID }
      );
      if (response.data.isDuplicate) {
        alert("이미 사용 중인 아이디입니다.");
      } else {
        alert("사용 가능한 아이디입니다.");
      }
    } catch (error) {
      console.error(error);
      alert("아이디 중복 확인에 실패했습니다.");
    }
  };

  return (
    <Wrapper>
      <Header />
      <Content>
        <Ment>회원가입</Ment>
        <IdWrapper>
          <InputWrapper
            style={{
              width: "177px",
            }}
          >
            <img src={loginImg} alt="로그인 이미지" />
            <input
              ref={idInputRef}
              placeholder="아이디"
              onChange={(e) => setID(e.target.value)}
            />
          </InputWrapper>
          <button onClick={checkIDDuplicate}>중복확인</button>
        </IdWrapper>

        <InputWrapper>
          <img src={PwImg} alt="자물쇠 이미지" />
          <input
            ref={pwInputRef}
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPW(e.target.value)}
          />
        </InputWrapper>
        <PwWrapper>
          <InputWrapper
            style={{
              width: "202px",
              marginRight: "16px",
            }}
          >
            <img src={PwImg} alt="자물쇠 이미지" />
            <input
              ref={PwconfirmInputRef}
              type="password"
              placeholder="비밀번호 확인"
              onChange={(e) => setPWConfirm(e.target.value)}
            />
          </InputWrapper>
          <img
            style={{
              marginRight: "6px",
            }}
            src={PW === PWconfirm ? check : checkGreen}
            alt="비밀번호 확인 이미지"
          />
        </PwWrapper>

        <InputWrapper>
          <img src={nickImg} alt="꽃 이미지" />
          <input
            type="password"
            placeholder="닉네임(최대 8자)"
            onChange={(e) => setPW(e.target.value)}
          />
        </InputWrapper>
        <LoginBtn onClick={goSignup}>회원가입</LoginBtn>
      </Content>
    </Wrapper>
  );
};

export default SignupPage;

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
  width: 240px;
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

const IdWrapper = styled.div`
  display: flex;
  flex-direction: row;

  button {
    width: 58px;
    height: 46px;
    background-color: #1ef380;
    border-radius: 12px;
    text-align: center;
    align-content: center;
    font-size: 12px;
    font-weight: 400;
    color: #ffffff;
    border-style: none;
    outline: none;
    cursor: pointer;
    margin-left: 5px;
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
  margin-top: 108px;
`;

const PwWrapper = styled.div`
  display: flex;
`;
