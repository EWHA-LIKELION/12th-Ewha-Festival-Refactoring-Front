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
  const location = useLocation();
  const boothIdFromProps = location.state?.id;
  const [fetchedBoothId, setFetchedBoothId] = useState(null);
  const [menuDetails, setMenuDetails] = useState([]);
  const [isScraped, setIsScraped] = useState(false);
  const [scrapCount, setScrapCount] = useState(0);
  const [boothData, setBoothData] = useState(null);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("부스정보");
  const boothType = localStorage.getItem("type");

  useEffect(() => {
    const fetchBoothData = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken");

        let boothId;
        if (boothType === "general") {
          boothId = boothIdFromProps;
        } else {
          boothId = await getBoothId(accessToken);
        }

        setFetchedBoothId(boothId);

        // Fetch booth details
        const response = await instance.get(
          `${process.env.REACT_APP_SERVER_PORT}/booths/${boothId}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setBoothData(response.data.data);
        setMenuDetails(response.data.data.menus);
        setIsScraped(response.data.data.is_scraped);
        setScrapCount(response.data.data.scrap_count);
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

  const fetchNotices = async () => {
    if (!fetchedBoothId) return;

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

      setNotices(response.data.notice);
    } catch (error) {
      console.error("공지사항을 불러오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [fetchedBoothId]);

  const clickScrap = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인을 해야 스크랩이 가능해요.");
      navigate("/login");
      return;
    }

    try {
      let response;
      if (isScraped) {
        response = await instance.delete(`/booths/${fetchedBoothId}/scrap/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setScrapCount((prevCount) => prevCount - 1);
          setIsScraped(false);
        }
      } else {
        response = await instance.post(
          `/booths/${fetchedBoothId}/scrap/`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 201) {
          setScrapCount((prevCount) => prevCount + 1);
          setIsScraped(true);
        }
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("스크랩 처리 중 오류가 발생했습니다.");
    }
  };

  const handleEditClick = () => {
    navigate(`/booth-edit/`, {
      state: { id: fetchedBoothId, notices: notices },
    });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0px",
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleContactClick = () => {
    if (boothData && boothData.admin_contact) {
      window.open(boothData.admin_contact, "_blank");
    } else {
      alert("연락처 정보가 없습니다.");
    }
  };

  return (
    <Wrapper>
      <Header>
        <img src={BackArrow} onClick={handleBack} alt="뒤로가기" />
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
        <img src={ContactButton} alt="Contact" onClick={handleContactClick} />{" "}
        {/* 클릭 이벤트 추가 */}
        <div className="scrap">
          <span>
            {boothData ? `${scrapCount}명이 스크랩했어요` : "Loading..."}
          </span>
          <img
            src={isScraped ? scrapAfter : scrapBefore}
            alt="Scrap"
            onClick={clickScrap}
          />
        </div>
      </Contact>
      <Notice>
        <div
          className="noticetitle"
          style={{ marginBottom: 20, marginLeft: 20 }}
        >
          실시간 공지사항
        </div>
        {notices.length > 0 ? (
          <Slider {...settings}>
            {notices.map((notice, index) => {
              let noticeClass = "기타공지";
              if (notice.notice_type === "판매공지") {
                noticeClass = "판매공지";
              } else if (notice.notice_type === "운영공지") {
                noticeClass = "운영공지";
              }

              return (
                <div className={`noticebox ${noticeClass}`} key={index}>
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
                      {notice.notice_type}
                    </div>
                    <div className="notice">{notice.content}</div>
                    <div className="noticetime">
                      {new Date(notice.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        ) : (
          <div style={{ textAlign: "center", marginBottom: 40, marginTop: 50 }}>
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
  width: 100%;
  margin-bottom: 20px;
  .noticetitle {
    font-size: 16px;
    font-weight: 700;
    margin-top: 25px;
  }

  .slick-slider {
    width: 90%;
    margin-left: 20px;
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
    margin: 6px;
    padding: 10px;
    margin-top: 20px;
    border: none;
  }

  .판매공지 {
    border-top: 1px solid #9747ff;
    border-bottom: 1px solid #9747ff;
    width: 350px;
  }

  .운영공지 {
    border-top: 1px solid #00f16f;
    border-bottom: 1px solid #00f16f;
  }

  .기타공지 {
    border: 1px solid transparent;
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
