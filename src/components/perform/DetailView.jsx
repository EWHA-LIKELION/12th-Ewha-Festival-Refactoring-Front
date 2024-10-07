import React, { useState } from "react";
import styled from "styled-components";
import arrowLeft from "../../images/arrowLeft.svg";
import mainImage from "../../images/main1.png";
import { BackButton, EditButton, HeaderNav, Logo } from "./common";
import GuestBook from "./GuestBook";
import InteractionPanel from "./InteractionPanel";
import MainCard from "./MainCard";
import NoticeInfo from "./NoticeInfo";
import PerformInfo from "./PerformInfo";

function DetailView() {
  const [activeTab, setActiveTab] = useState("공연 정보"); // Default active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update active tab when clicked
  };

  return (
    <Wrap>
      {activeTab == "공연 정보" ? (
        <HeaderNav>
          {/* 이전 버튼? 
					<BackButton>
						<img src={arrowLeft} />
					</BackButton> */}

          <EditButton>수정</EditButton>
        </HeaderNav>
      ) : (
        <HeaderNav>
          <BackButton>
            <img src={arrowLeft} />
          </BackButton>

          <Logo />
        </HeaderNav>
      )}
      <MainCard img={mainImage} isText />
      <InteractionPanel />
      <NoticeInfo />
      <Taps>
        <ResetButton
          isActive={activeTab === "공연 정보"} // Pass active status
          onClick={() => handleTabClick("공연 정보")}
        >
          공연 정보
        </ResetButton>
        <ResetButton
          isActive={activeTab === "방명록"} // Pass active status
          onClick={() => handleTabClick("방명록")}
        >
          방명록
        </ResetButton>
      </Taps>
      {activeTab == "공연 정보" ? <PerformInfo /> : <GuestBook />}
    </Wrap>
  );
}

export default DetailView;

const Wrap = styled.div`
  button {
    cursor: pointer;
  }
  padding-inline: 20px;
`;

const Taps = styled.div`
  width: 112px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  padding-top: 29px;
  margin-left: 20px;
`;

const ResetButton = styled.button`
  white-space: nowrap;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -1.5px;
  color: ${(props) => (props.isActive ? "#000" : "#bbb")};
  padding: 0;
  height: 23px;
  border-bottom: ${(props) => (props.isActive ? "2px solid #000" : "none")};
`;
