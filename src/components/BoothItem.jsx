import React, { useState, useEffect } from "react";
import instance from "../api/axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BasicBooth from "../images/basicbooth.svg"; // 기본 부스 이미지 경로
import scrapBefore from "../images/BoothDetail/scrapbefore.svg";
import scrapAfter from "../images/BoothDetail/scrapafter.svg";

const BoothItem = ({ booth }) => {
  const [scrapCount, setScrapCount] = useState(booth.scrap_count || 0);
  const [isScraped, setIsScraped] = useState(booth.is_scraped || false);
  const navigate = useNavigate();

  useEffect(() => {
    if (booth) {
      setScrapCount(booth.scrap_count || 0);
      setIsScraped(booth.is_scraped || false);
    }
  }, [booth]);

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
        response = await instance.delete(`/booths/${booth.id}/scrap/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setScrapCount((prevCount) => prevCount - 1); // 스크랩 수 감소
        setIsScraped(false); // 스크랩 상태 false로 변경
      } else {
        response = await instance.post(
          `/booths/${booth.id}/scrap/`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setScrapCount((prevCount) => prevCount + 1); // 스크랩 수 증가
        setIsScraped(true); // 스크랩 상태 true로 변경
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("스크랩 처리 중 오류가 발생했습니다.");
    }
  };

  const handleBoothClick = () => {
    navigate("/booth-detail", {
      state: { id: booth.id },
    });
  };

  return (
    <Booth
      isOpened={booth.is_opened}
      onClick={handleBoothClick}
      style={{
        backgroundImage: `url(${
          booth.thumbnail
            ? `${process.env.REACT_APP_SERVER_PORT}${booth.thumbnail}`
            : BasicBooth
        })`,
      }}
    >
      <BoothInfo>
        <img
          src={isScraped ? scrapAfter : scrapBefore} // 상태에 따라 아이콘 변경
          alt="Scrap"
          onClick={clickScrap} // 클릭 시 상태 변화
        />
        <ScrapCount>{scrapCount}</ScrapCount> {/* 스크랩 카운트 표시 */}
        {!booth.is_opened && <ClosedLabel>운영 종료</ClosedLabel>}
        <BoothName>{booth.name}</BoothName>
        <BoothLocation>
          {booth.booth_place} · {booth.category}
        </BoothLocation>
      </BoothInfo>
    </Booth>
  );
};

export default BoothItem;

// 스타일링 코드는 그대로 유지

const Booth = styled.div`
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: 0px 0px 9px 0px rgba(255, 255, 255, 0.25) inset;
  display: flex;
  padding: 17px;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  position: relative;
  z-index: 1;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0) 161.62%
    );
    border-radius: 20px;
    z-index: 2;
  }

  & > * {
    z-index: 3;
  }
`;

const BoothInfo = styled.div`
  img {
    position: absolute;
    top: 1.06rem;
    right: 0.87rem;
    cursor: pointer;
    z-index: 3;
  }
`;

const ScrapCount = styled.div`
  color: var(--green_01, #00f16f);
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.5px;
  position: absolute;
  top: 2.8rem;
  right: 1.5rem;
  text-align: center;
`;

const BoothName = styled.div`
  color: var(--wh01, var(--wh, #fff));
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.3px;
`;

const BoothLocation = styled.div`
  color: var(--wh01, var(--wh, #fff));
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.5px;
`;

const ClosedLabel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--green05, rgba(0, 241, 111, 0.4));
  color: white;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  z-index: 2;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 800;
  line-height: 20px;
  letter-spacing: -0.3px;
`;
