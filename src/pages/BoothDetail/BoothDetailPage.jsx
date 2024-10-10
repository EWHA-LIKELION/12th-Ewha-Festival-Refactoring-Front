// BoothDetailPage.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackArrow from "../../images/BoothDetail/arrow-left.svg";
import EditButton from "../../images/BoothDetail/editbuttom.svg";
import logo from "../../images/BoothEdit/logo.svg";
import 임시부스이미지 from "../../images/BoothDetail/임시부스이미지.svg";
import ContactButton from "../../images/BoothDetail/ContactButton.svg";
import scrapBefore from "../../images/BoothDetail/scrapbefore.svg";
import scrapAfter from "../../images/BoothDetail/scrapafter.svg";
import BoothInfo from "./BoothInfo";
import instance from "../../api/axios";
import MenuImage from "../../components/MenuImage"; // MenuImage 컴포넌트 추가
import GuestBook from "../../components/perform/GuestBook";
import Slider from "react-slick";

// Import slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BoothDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // location을 사용하여 부스 ID를 가져옴
  const boothIdFromProps = location.state?.id; // 부스 ID를 props에서 가져옴
  const [fetchedBoothId, setFetchedBoothId] = useState(null);
  const [menuDetails, setMenuDetails] = useState([]); // 메뉴 정보를 배열로 초기화
  const [isScraped, setIsScraped] = useState(false);
  const [boothData, setBoothData] = useState(null);
  const [notices, setNotices] = useState([]); // 공지사항 상태 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("부스정보"); // Default active tab
  const boothType = localStorage.getItem("type");

  useEffect(() => {
    console.log("Location state:", location.state);
    console.log("Received Booth ID:", boothIdFromProps); // 부스 ID 확인
    const fetchBoothData = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken");

        // 로컬스토리지에서 type을 가져옴

        // type이 'general'인 경우 props에서 boothId를 가져옴

        let boothId;

        if (boothType === "general") {
          boothId = boothIdFromProps;
        } else {
          boothId = await getBoothId(accessToken);
        }

        setFetchedBoothId(boothId);

        // 부스 상세 정보 조회
        const response = await instance.get(
          `${process.env.REACT_APP_SERVER_PORT}/booths/${boothId}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setBoothData(response.data.data);
        setMenuDetails(response.data.data.menus); // 메뉴 정보 설정

        console.log(response.data.data.menus); // 응답 데이터 콘솔에 출력
        console.log(response.data.data); // 응답 데이터 콘솔에 출력
        console.log(response);
      } catch (error) {
        setError(
          "부스 정보를 불러오는 데 실패했습니다. 오류: " + error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBoothData();
  }, [boothIdFromProps]);

  // 부스 ID를 가져오는 함수
  const getBoothId = async (accessToken) => {
    const boothIdResponse = await instance.get(
      `${process.env.REACT_APP_SERVER_PORT}/manages/main/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const fetchedBoothId = boothIdResponse.data.booth_id;

    if (fetchedBoothId === undefined || fetchedBoothId === null) {
      throw new Error("부스 ID를 찾을 수 없습니다.");
    }

    return fetchedBoothId;
  };

  // 공지사항 조회를 위한 useEffect 추가
  useEffect(() => {
    const fetchNotices = async () => {
      if (!fetchedBoothId) return; // 부스 ID가 없으면 종료

      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await instance.get(
          `${process.env.REACT_APP_SERVER_PORT}/manages/${fetchedBoothId}/realtime_info/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("noticeresponse:", response.data); // 전체 응답 데이터 출력
        // notice 배열을 상태에 설정
        setNotices(response.data.notice);
      } catch (error) {
        console.error("공지사항을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchNotices();
  }, [fetchedBoothId]); // 부스 ID가 변경될 때마다 공지사항을 조회

  const clickScrap = () => {
    setIsScraped((prev) => !prev);
  };

  const handleEditClick = () => {
    navigate(`/booth-edit/`, {
      state: { id: fetchedBoothId, notices: notices },
    });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab); // 탭 클릭 시 활성화 상태 변경
  };

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  const settings = {
    dots: true, // 슬라이드 아래 점 표시
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false, // 중앙 정렬 모드 비활성화
    centerPadding: "0px", // 중앙 정렬 시 여백 제거
  };

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };
  return (
    <Wrapper>
      <Header>
        <img src={BackArrow} onClick={handleBack} alt="뒤로가기" />

        {/* type이 'general'인 경우 logo를 사용하고 그 외의 경우 EditButton을 사용 */}
        <img
          src={boothType === "general" ? logo : EditButton}
          alt="편집 버튼"
          onClick={handleEditClick}
        />
      </Header>
      <BoothImage>
        <img
          src={
            boothData.thumbnail
              ? `${process.env.REACT_APP_SERVER_PORT}${boothData.thumbnail}`
              : 임시부스이미지
          }
          alt="부스이미지"
        />
      </BoothImage>
      <div className="booth">
        {boothData ? (
          <>
            <div className="boothName">{boothData.name}</div>
            <div className="boothInfo">
              {boothData.booth_place}/{boothData.category}
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Contact>
        <img src={ContactButton} alt="Contact" />
        <div className="scrap">
          <span>
            {boothData
              ? `${boothData.scrap_count}명이 스크랩했어요`
              : "Loading..."}
          </span>
          <img
            src={isScraped ? scrapAfter : scrapBefore}
            alt="Scrap"
            onClick={clickScrap}
          />
        </div>
      </Contact>
      <Notice>
        <div className="noticetitle" style={{ marginBottom: 70 }}>
          실시간 공지사항
        </div>
        {notices.length > 0 ? (
          <Slider {...settings}>
            {notices.map((notice, index) => {
              let noticeClass = "기타공지"; // 기본 클래스 설정
              if (notice.notice_type === "판매공지") {
                noticeClass = "판매공지"; // 판매공지 클래스 설정
              } else if (notice.notice_type === "운영공지") {
                noticeClass = "운영공지"; // 운영공지 클래스 설정
              }

              return (
                <div
                  className={`noticebox ${noticeClass}`} // 동적으로 클래스 추가
                  key={index}
                >
                  <div>
                    <div
                      className="noticeCatagory"
                      style={{
                        background:
                          notice.notice_type === "판매공지"
                            ? "#9747ff"
                            : notice.notice_type === "운영공지"
                            ? "#00F16F"
                            : "transparent",
                        color: "white",
                      }}
                    >
                      {notice.notice_type} {/* notice_type 표시 */}
                    </div>
                    <div className="notice">{notice.content}</div>
                    <div className="noticetime">
                      {new Date(notice.created_at).toLocaleString()}{" "}
                      {/* 시간 변환 */}
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        ) : (
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            공지사항이 없습니다.
          </div>
        )}
      </Notice>

      <MiddleWrapper>
        <div className="top">
          <TabButton
            isActive={activeTab === "부스정보"}
            onClick={() => handleTabClick("부스정보")}
          >
            부스정보
          </TabButton>
          <TabButton
            isActive={activeTab === "방명록"}
            onClick={() => handleTabClick("방명록")}
          >
            방명록
          </TabButton>
        </div>

        {activeTab === "부스정보" ? (
          <Booth>
            <BoothInfo boothData={boothData} />
            <MenuWrapper>
              {menuDetails.length > 0 ? (
                menuDetails.map((menu) => (
                  <MenuImage key={menu.id} menu={menu} />
                ))
              ) : (
                <div>메뉴 정보가 없습니다.</div>
              )}
            </MenuWrapper>
          </Booth>
        ) : (
          <GuestBook />
        )}
      </MiddleWrapper>
    </Wrapper>
  );
};

export default BoothDetailPage;

// Styled components remain unchanged...

const Wrapper = styled.div`
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  .booth {
    z-index: 100;
    color: white;
    transform: translate(-90px, -60px);
  }
  .boothName {
    font-size: 24px;
    font-weight: 700;
  }
  .boothInfo {
    font-size: 15px;
    font-weight: 500;
  }
`;

const LoadingMessage = styled.div`
  font-size: 16px;
  color: #999;
  text-align: center;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  font-size: 16px;
  color: red;
  text-align: center;
  margin-top: 20px;
`;

const Header = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const BoothImage = styled.div`
  border-radius: 15px;
  height: 197px;
  width: 350px;
  overflow: hidden;
  position: relative;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Contact = styled.div`
  width: 90%;
  height: 32px;
  display: flex;
  justify-content: space-between;

  .scrap {
    height: 100%;
    display: flex;
    align-items: center;
    img {
      cursor: pointer;
    }
  }
  span {
    color: #5aeaae;
    font-size: 13px;
    font-weight: 600;
    padding: 5px;
  }
`;

const Notice = styled.div`
  padding-top: 10px;
  width: 100%; /* 전체 너비 사용 */
  margin-bottom: 20px;
  .noticetitle {
    font-size: 16px;
    font-weight: 700;
    margin-top: 25px;
    margin-bottom: 10px;
  }

  .slick-slider {
    width: 90%; /* 슬라이더 전체 너비 설정 */
  }

  .slick-slide {
    width: 350px;
  }

  .noticebox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 93px;
    border-radius: 15px;
    margin: 6px;
    padding: 10px; /* 필요한 패딩 설정 */
    margin-top: 20px;
  }

  .판매공지 {
    border: 1px solid #9747ff; /* 판매공지 보더 색상 */
    width: 350px;
  }

  .운영공지 {
    border: 1px solid #00f16f; /* 운영공지 보더 색상 */
  }

  .기타공지 {
    border: 1px solid transparent; /* 기타 공지 보더 색상 */
  }

  .noticeCatagory {
    width: 56px;
    height: 23px;
    border-radius: 5.385px;
    color: white;
    font-size: 10.769px;
    font-weight: 700;
    text-align: center;
    line-height: 23px;
    margin-bottom: 15px;
    align-self: flex-start;
    margin-left: 10px;
  }

  .notice {
    font-size: 12px;
    font-weight: 500;
    width: 322px;
    margin-bottom: 15px;
  }

  .noticetime {
    color: #8e8e8e;
    font-size: 9.761px;
    font-weight: 600;
    width: 322px;
    text-align: right;
  }
`;

const MiddleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .top {
    display: flex;
    width: 90%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const Booth = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuWrapper = styled.div`
  margin-left: 20px;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 170px));
  box-sizing: border-box;
  grid-auto-rows: 197px;
  margin: 20px;
  gap: 7px;
`;

const TabButton = styled.button`
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
  margin-right: 20px; // 탭 간 간격
`;
