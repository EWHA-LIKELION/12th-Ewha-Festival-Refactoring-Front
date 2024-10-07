import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // useNavigate 추가
import styled from "styled-components";
import BackArrow from "../../images/BoothDetail/arrow-left.svg";
import EditButton from "../../images/BoothDetail/editbuttom.svg";
import 임시부스이미지 from "../../images/BoothDetail/임시부스이미지.svg";
import ContactButton from "../../images/BoothDetail/ContactButton.svg";
import scrapBefore from "../../images/BoothDetail/scrapbefore.svg";
import scrapAfter from "../../images/BoothDetail/scrapafter.svg";
import BoothInfo from "./BoothInfo";
import MenuImage from "../../components/MenuImage";
import instance from "../../api/axios";

const BoothDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate 추가
  const boothId = location.state?.id;

  const [menuDetails, setMenuDetails] = useState({});
  const [isScraped, setIsScraped] = useState(false);
  const [boothData, setBoothData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!boothId) {
      setError("부스 아이디를 찾을 수 없습니다.");
      setLoading(false);
      return;
    }

    const fetchBoothData = async () => {
      try {
        const response = await instance.get(`/booths/${boothId}/`);
        setBoothData(response.data.data);
        const savedMenuDetails = localStorage.getItem("menuDetails");
        if (savedMenuDetails) {
          setMenuDetails(JSON.parse(savedMenuDetails));
        }
      } catch (error) {
        console.error("Error fetching booth data:", error);
        setError("부스 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchBoothData();
  }, [boothId]);

  const clickScrap = () => {
    setIsScraped((prev) => !prev);
  };

  const handleEditClick = () => {
    navigate(`/booth-edit/`, { state: { id: boothId } }); // 수정 버튼 클릭 시 부스 ID 전달
  };

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Wrapper>
      <Header>
        <img src={BackArrow} alt="뒤로가기" />
        <img src={EditButton} alt="편집 버튼" onClick={handleEditClick} />{" "}
        {/* 수정 버튼 클릭 핸들러 추가 */}
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
        <div className="noticebox">
          {boothData && boothData.notice ? (
            <>
              <div className="noticeCatagory">
                {boothData.notice.notice_type}
              </div>
              <div className="notice">{boothData.notice.content}</div>
              <div className="noticetime">2시간전</div>
            </>
          ) : (
            <div>공지사항이 없습니다.</div>
          )}
        </div>
        <div className="noticedot"></div>
      </Notice>
      <MiddleWrapper>
        <div className="top">
          <div className="boothInfo">부스정보</div>
          <div className="guestBook">방명록</div>
        </div>
        <Booth>
          <BoothInfo boothData={boothData} />
          <MenuWrapper>
            <MenuImage menu={menuDetails} />
          </MenuWrapper>
        </Booth>
      </MiddleWrapper>
    </Wrapper>
  );
};

export default BoothDetailPage;

const Wrapper = styled.div`
  min-height: calc(var(--vh, 1vh) * 100); /* 최소 높이 설정 */
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
  overflow: hidden; /* 이미지가 부모 요소를 넘지 않도록 설정 */
  position: relative; /* 자식 img의 절대 위치 지정을 위해 설정 */

  img {
    position: absolute; /* 부모 div를 기준으로 위치 지정 */
    top: 0; /* 부모 div의 상단에 맞춤 */
    left: 0; /* 부모 div의 좌측에 맞춤 */
    width: 100%; /* 너비를 부모 div에 맞춤 */
    height: 100%; /* 높이를 부모 div에 맞춤 */
    object-fit: cover; /* 이미지가 비율을 유지하며 부모 div에 꽉 차도록 설정 */
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
    border: 1px solid #9747ff;
  }
  .noticeCatagory {
    width: 56px;
    height: 23px;
    border-radius: 5.385px;
    background: #9747ff;
    color: white;
    font-size: 10.769px;
    font-weight: 700;
    text-align: center;
    line-height: 23px;
    margin-bottom: 15px;
    align-self: self-start;
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
`;
