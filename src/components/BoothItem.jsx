import React, { useState, useEffect } from "react";
import instance from "../api/axios";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import BasicBooth from "../images/basicbooth.svg"; // 기본 부스 이미지 경로
import scrapBefore from "../images/BoothDetail/scrapbefore.svg";
import scrapAfter from "../images/BoothDetail/scrapafter.svg";

const BoothItem = ({ booth }) => {
  const [scrapCount, setScrapCount] = useState(booth.scrap_count || 0); // booth.scrap_count 값을 초기 상태로 사용
  const [isScraped, setIsScraped] = useState(booth.is_scraped || false);

  //

  const navigate = useNavigate();

  // booth.scrap_count가 변경될 때마다 scrapCount 상태를 업데이트
  useEffect(() => {
    if (booth) {
      setScrapCount(booth.scrap_count || 0); // booth가 유효할 때만 업데이트
      setIsScraped(booth.is_scraped || false); // booth가 유효할 때만 업데이트
    }
  }, [booth]);

  const clickScrap = async (e, isScraped) => {
    e.stopPropagation();
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("로그인을 해야 스크랩이 가능해요.");
      navigate("/login");
      return;
    }
    console.log(isScraped);
    console.log("부스 정보:", booth);
    console.log("Sending request for booth id: ", booth.id); // booth.id 로그로 확인
    try {
      let response;
      if (isScraped) {
        response = await instance.delete(
          `/booths/${booth.id}/scrap/`,

          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // 스크랩 삭제 후 상태 업데이트
        setIsScraped(false);
        console.log(response.data);
        console.log(booth);

        // 스크랩이 삭제되었으므로 false로 설정
      } else {
        response = await instance.post(
          `/booths/${booth.id}/scrap/`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsScraped(true);
        console.log(response.data);
        console.log(booth);

        // 스크랩 추가 후 상태 업데이트
        // 스크랩이 추가되었으므로 true로 설정
      }

      alert(response.data.message);
    } catch (error) {
      console.error("Error: ", error);
      if (error.response) {
        console.log(error.response.data.message);
        const already = error.response.data.message;
        if (already === "이미 스크랩 하셨습니다.") {
          const response = await instance.delete(
            `/booths/${booth.id}/scrap/`,

            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log(response.data.message);

          // 스크랩 삭제 후 상태 업데이트

          setIsScraped(false);
          console.log(booth);
        }
      } else {
        alert("스크랩 처리 중 오류가 발생했습니다.");
      }
    }
  };

  const handleBoothClick = () => {
    navigate(`/booth-detail/`); // 부스 상세 페이지로 이동
  };

  return (
    <Booth
      isOpened={booth.is_opened}
      onClick={handleBoothClick} // 부스 클릭 핸들러 추가
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
          src={booth.is_scraped ? scrapAfter : scrapBefore}
          alt="Scrap"
          onClick={clickScrap}
        />
        <ScrapCount>{booth.scrap_count}</ScrapCount>
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
  right: 1.6rem;
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
