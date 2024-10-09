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

const BoothDetailPage = () => {
  const navigate = useNavigate();
  const [fetchedBoothId, setFetchedBoothId] = useState(null);
  const [menuDetails, setMenuDetails] = useState([]); // 메뉴 정보를 배열로 초기화
  const [isScraped, setIsScraped] = useState(false);
  const [boothData, setBoothData] = useState(null);
  const [notices, setNotices] = useState([]); // 공지사항 상태 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoothData = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken");

        // 부스 ID 조회
        const boothIdResponse = await instance.get(
          `${process.env.REACT_APP_SERVER_PORT}/manages/main/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // 부스 ID 확인
        const fetchedBoothId = boothIdResponse.data.booth_id;

        if (fetchedBoothId === undefined || fetchedBoothId === null) {
          throw new Error("부스 ID를 찾을 수 없습니다.");
        }

        setFetchedBoothId(fetchedBoothId);

        // 부스 상세 정보 조회
        const response = await instance.get(
          `${process.env.REACT_APP_SERVER_PORT}/booths/${fetchedBoothId}/`
        );

        setBoothData(response.data.data);
        setMenuDetails(response.data.data.menus); // 메뉴 정보 설정

        console.log(response.data.data.menus); // 응답 데이터 콘솔에 출력
        console.log(response.data.data); // 응답 데이터 콘솔에 출력
      } catch (error) {
        setError(
          "부스 정보를 불러오는 데 실패했습니다. 오류: " + error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBoothData();
  }, []);

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

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  // 로컬스토리지에서 type을 가져옴
  const boothType = localStorage.getItem("type");

  return (
    <Wrapper>
      <Header>
        <img src={BackArrow} alt="뒤로가기" />
        {/* type이 'general'인 경우 logo를 사용하고 그 외의 경우 EditButton을 사용 */}
        <img
          src={boothType === "general" ? logo : EditButton}
          alt="편집 버튼"
          onClick={handleEditClick}
        />
      </Header>
      <BoothImage>
        <img src={boothData?.thumbnail || 임시부스이미지} alt="부스이미지" />
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
        <div className="noticetitle">실시간 공지사항</div>
        {notices.length > 0 ? (
          notices.map((notice, index) => (
            <div
              className="noticebox"
              key={index}
              style={{
                border: `1px solid ${
                  notice.notice_type === "판매공지"
                    ? "#9747ff"
                    : notice.notice_type === "운영공지"
                    ? "#00F16F"
                    : "transparent"
                }`,
              }} // 보더 색상 직접 적용
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
          ))
        ) : (
          <div>공지사항이 없습니다.</div>
        )}
      </Notice>
      <MiddleWrapper>
        <div className="top">
          <div className="boothInfo">부스정보</div>
          <div className="guestBook">방명록</div>
        </div>
        <Booth>
          <BoothInfo boothData={boothData} />
          <MenuWrapper>
            {menuDetails.length > 0 ? (
              menuDetails.map((menu) => <MenuImage key={menu.id} menu={menu} />)
            ) : (
              <div>메뉴 정보가 없습니다.</div>
            )}
          </MenuWrapper>
        </Booth>
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
  .noticetitle {
    font-size: 16px;
    font-weight: 700;
    margin-top: 25px;
    margin-bottom: 10px;
  }

  .noticebox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 350px;
    height: 93px;
    border-radius: 15px;
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
    align-self: flex-start; // 수정된 정렬 방식
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
  .boothInfo {
    margin-right: 20px;
  }
`;

const Booth = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: auto;
`;
