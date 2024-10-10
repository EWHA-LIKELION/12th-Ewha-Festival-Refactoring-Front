import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";
import SignupModal from "../components/SignupModal";

import nickImg from "../images/nickImg.svg";

import arrowLeft from "../images/arrowLeft.svg";

const KakaoSignupPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const nameInputRef = useRef(null);

  const goSignup = async () => {
    if (!name) {
      alert("닉네임을 입력해주세요.");
      nameInputRef.current.focus();
      return;
    }

    try {
      const response = await instance.post(
        `${process.env.REACT_APP_SERVER_PORT}/accounts/signup/`,
        {
          nickname: name,
        }
      );
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("다른 사람이 사용 중인 이름입니다.");
    }
  };

  const [modal, setModal] = useState(false);
  // 모달창의 state를 바꾸는 함수 작성 (true <-> false)
  const openModal = () => {
    setModal(true);
  };

  return (
    <Wrapper>
      {modal ? <SignupModal setModal={setModal} goSignup={goSignup} /> : null}
      <Header>
        <img src={arrowLeft} onClick={() => navigate("/")} />
      </Header>

      <Content>
        <Ment>회원가입</Ment>
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
        <LoginBtn onClick={openModal}>회원가입</LoginBtn>
      </Content>
    </Wrapper>
  );
};

export default KakaoSignupPage;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 20px 26px;
  width: 390px;

  z-index: 12;
  img {
    cursor: pointer;
    margin-left: 17px;
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
  margin-left: 6px;
  padding-top: 7px;
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
