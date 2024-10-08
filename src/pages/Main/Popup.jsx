import React, { useState, useEffect } from "react";
import styled from "styled-components";
import background from "../../images/popup-background.svg";

const Popup = ({ onClose }) => {
  const handleDoNotShowToday = () => {
    const today = new Date();
    localStorage.setItem("popupClosed", today.toDateString());
    onClose();
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <img src={background} />
        <ButtonWrapper>
          <button onClick={onClose}>닫기</button>
          <button onClick={handleDoNotShowToday}>하루동안 보지 않기</button>
        </ButtonWrapper>
      </PopupContent>
    </PopupOverlay>
  );
};

export default Popup;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  position: relative;
  height: 555px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 1.3rem;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: space-between;
  gap: 0.625rem;

  button {
    width: 7.25rem;
    height: 1.875rem;
    padding: 0.3125rem 0.375rem;
    border-radius: 0.3125rem;
    border: 1px solid var(--green_01, #00f16f);
    background: var(--green_01, #00f16f);
    color: var(--wh01, var(--wh, #fff));
    text-align: center;
    font-family: Pretendard;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    cursor: pointer;

    &:first-child {
      border: 1px solid var(--gray02, #f2f2f2);
      background: var(--gray03, #f7f7f7);
      color: var(--gray01, #bbb);
    }
  }
`;
