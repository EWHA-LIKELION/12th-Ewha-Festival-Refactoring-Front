import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";

import loginImg from "../images/loginImg.svg";
import PwImg from "../images/PwImg.svg";
import nickImg from "../images/nickImg.svg";
import check from "../images/check.svg";
import checkGreen from "../images/checkGreen.svg";
import arrowLeft from "../images/arrowLeft.svg";

const SignupPage = () => {
  const navigate = useNavigate();

  const [ID, setID] = useState();
  const [PW, setPW] = useState();
  const [PWconfirm, setPWConfirm] = useState();
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [idsame, setIdsame] = useState(false);

  const pwInputRef = useRef(null);
  const idInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const PwconfirmInputRef = useRef(null);

  const isSame = PW !== "" && PWconfirm !== "" && PW === PWconfirm;

  const goSignup = async () => {
    if (!ID && !PW && !name) {
      alert("아이디와 비밀번호, 닉네임를 입력해주세요.");
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

    if (!name) {
      alert("닉네임을 입력해주세요.");
      nameInputRef.current.focus();
      return;
    }

    if (idsame === false) {
      alert("다른 아이디를 사용해주세요.");
      idInputRef.current.focus();
      return;
    }

    try {
      const response = await instance.post(
        `${process.env.REACT_APP_SERVER_PORT}/accounts/signup/`,
        {
          username: ID,
          password: PW,
          nickname: name,
        }
      );
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("다른 사람이 사용 중인 이름입니다.");
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
        `${process.env.REACT_APP_SERVER_PORT}/accounts/check-username/`,
        { username: ID }
      );
      console.log(response);
      setError("*사용 가능한 아이디입니다.");
      setIdsame(true);
    } catch (error) {
      console.error(error);
      setError("*다른 사람이 사용 중인 아이디입니다.");
      setIdsame(false);
    }
  };

  return (
    <Wrapper>
      <Header>
        <img src={arrowLeft} onClick={() => navigate("/login")} />
      </Header>
      <Content>
        <Ment>회원가입</Ment>
        <IdWrapper>
          <IdTopWrapper>
            <InputWrapper
              style={{
                width: "177px",
              }}
            >
              <img src={loginImg} alt="로그인 이미지" />
              <input
                ref={idInputRef}
                placeholder="아이디"
                type="text"
                value={ID}
                onChange={(e) => setID(e.target.value)}
              />
            </InputWrapper>
            <button onClick={checkIDDuplicate}>중복확인</button>
          </IdTopWrapper>
          <Idcheck>{error}</Idcheck>
        </IdWrapper>

        <InputWrapper>
          <img src={PwImg} alt="자물쇠 이미지" />
          <input
            ref={pwInputRef}
            type="password"
            placeholder="비밀번호"
            value={PW}
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
              value={PWconfirm}
              onChange={(e) => setPWConfirm(e.target.value)}
            />
          </InputWrapper>
          {PW && PWconfirm !== "" && isSame ? (
            <img
              style={{
                marginRight: "6px",
                marginTop: "15px",
              }}
              src={checkGreen}
              alt="비밀번호 확인 이미지"
            />
          ) : (
            <img
              style={{
                marginRight: "6px",
                marginTop: "15px",
              }}
              src={check}
              alt="비밀번호 확인 이미지"
            />
          )}
        </PwWrapper>

        <InputWrapper>
          <img src={nickImg} alt="꽃 이미지" />
          <input
            type="text"
            ref={nameInputRef}
            value={name}
            placeholder="닉네임(최대 8자)"
            onChange={(e) => setName(e.target.value)}
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

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 40px 20px 26px;

  img {
    cursor: pointer;
  }
`;

const InputWrapper = styled.div`
  color: #bbb;
  font-size: 12px;
  font-weight: 400;

  display: flex;

  width: 240px;
  height: 46px;
  background-color: #f5f5f5;
  border-radius: 12px;
  padding-left: 12px;
  margin-top: 20px;

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
  flex-direction: column;
  align-items: left;

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
    margin-top: 20px;
  }
`;

const IdTopWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Idcheck = styled.div`
  color: var(--purple, var(--purple, #9747ff));
  font-family: Pretendard;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: -0.5px;
  margin: 0px;
  margin-left: 6px;
  margin-top: 7px;
`;

const Ment = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 37px;
  margin-bottom: 77px;
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
  align-items: center;
`;
