import React, { useEffect, useState } from "react";
import styled from "styled-components";
import arrowLeft from "../../images/arrowLeft.svg";
import mainImage from "../../images/main1.png";
import { BackButton, EditButton, HeaderNav, Logo } from "./common";
import GuestBook from "./GuestBook";
import InteractionPanel from "./InteractionPanel";
import MainCard from "./MainCard";
import NoticeInfo from "./NoticeInfo";
import PerformInfo from "./PerformInfo";
import instance from "../../api/axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import {useNavigate} from "react-router-dom";

function AdminDetailView({ boothId }) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("공연 정보"); // Default active tab
  const [noticeInfo, setNoticeInfo] = useState([]);
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update active tab when clicked
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await instance.get(
          `${process.env.REACT_APP_SERVER_PORT}/manages/${boothId}/realtime_info`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setNoticeInfo(response.data.notice);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetchData();
  }, [boothId]);

  return (
    <Wrap>
      {activeTab == "공연 정보" ? (

        <HeaderNav>

          <BackButton>
            <img src={arrowLeft} />
          </BackButton>

          <EditButton onClick={() => navigate("/detail/admin/edit", { state: { id: boothId } })}>
          수정
        </EditButton>
        </HeaderNav>
      ) : (

        <HeaderNav>
          <BackButton>
            <img src={arrowLeft} />
          </BackButton>

          

          <EditButton onClick={() => navigate("/detail/admin/edit", { state: { id: boothId } })}>
          수정
        </EditButton>
        </HeaderNav>
      )}
<MainCard img={mainImage} isText boothId={boothId} />
      <InteractionPanel />
      <h3 className="title">실시간 공지사항</h3>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>
          <NoticeInfo />
        </SwiperSlide>
         <SwiperSlide>
          <NoticeInfo />
        </SwiperSlide> 
         {noticeInfo.map((notice) => (
          <SwiperSlide>
            <NoticeInfo notice={notice} />
          </SwiperSlide>
        ))} 
        {/* 추후 공지사항 받아오면 주석 해제 하면 스와이퍼 생김 */}
      </Swiper>
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
      {activeTab == "공연 정보" ? (
        <PerformInfo boothId={boothId} />
            ) : (
        <GuestBook boothId={boothId} />
      )}
      {/*<ButtonWrapper>
        <button
          id='showModifyBtn'
          onClick={() => {
            navigate("/detail/admin/edit", { state: { id: boothId } });
          }}
        >수정</button> 
      </ButtonWrapper> */}
    </Wrap>
  );
}

export default AdminDetailView;

const Wrap = styled.div`
  button {
    cursor: pointer;
  }
  padding-inline: 20px;
  position: relative;
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

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: -5rem;
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

