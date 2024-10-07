import styled from "styled-components";
import arrowLeft from "../../images/arrowLeft.svg";
import { BackButton, HeaderNav, Logo } from "./common";
import InteractionPanel from "./InteractionPanel";
import MainCard from "./MainCard";

import React from "react";
import mainImage from "../../images/main1.png";
import AdminNoticeInfo from "./AdminNoticeInfo";
import GuestBook from "./GuestBook";
import PerformInfo from "./PerformInfo";

function AdminView() {
  return (
    <>
      <Wrap>
        <HeaderNav>
          <BackButton>
            <img src={arrowLeft} />
          </BackButton>

          <Logo />
        </HeaderNav>
        <MainCard img={mainImage} isText />
        <InteractionPanel />
        <AdminNoticeInfo />
        <PerformInfo />
      </Wrap>
      <GuestTitle>방명록</GuestTitle>
      <Wrap>
        <GuestBook />
      </Wrap>
    </>
  );
}

export default AdminView;

const Wrap = styled.div`
  button {
    cursor: pointer;
  }
  padding: 0 20px;
`;

const GuestTitle = styled.h1`
  color: var(--gray01, #bbb);
  width: 390px;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px; /* 100% */
  letter-spacing: -0.5px;
  border-top: solid 1px #f2f2f2;

  margin: 0;
  padding-left: 20px;
  padding-top: 26px;
  margin-top: 35px;
`;
