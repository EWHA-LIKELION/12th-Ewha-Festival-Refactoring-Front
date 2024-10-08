import React, { useState, useEffect } from "react";
import instance from "../api/axios";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import BasicBooth from "../images/basicbooth.svg"; // 기본 부스 이미지 경로
import scrapBefore from "../images/BoothDetail/scrapbefore.svg";
import scrapAfter from "../images/BoothDetail/scrapafter.svg";

const BoothItem = ({ booth, onClick }) => {
  const [scrapCount, setScrapCount] = useState(booth.scrap_count); // booth.scrap_count 값을 초기 상태로 사용
  const navigate = useNavigate();

  // booth.scrap_count가 변경될 때마다 scrapCount 상태를 업데이트
  useEffect(() => {
    setScrapCount(booth.scrap_count); // booth.scrap_count 값이 변경될 때 scrapCount를 업데이트
  }, [booth.scrap_count]);

  const clickScrap = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("로그인을 해야 스크랩이 가능해요.");
      navigate("/login");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("Sending request for booth id: ", booth.id); // booth.id 로그로 확인

      // scrapCount가 0이면 스크랩을 추가, 1이면 스크랩을 삭제
      if (scrapCount === 0) {
        const response = await instance.post(
          `${process.env.REACT_APP_SERVER_PORT}/booths/${booth.id}/scrap/`,
          null, // 빈 객체 제거
          config
        );
        console.log("Response: ", response); // 응답 로그 확인
        if (response.data.message === "스크랩 성공") {
          setScrapCount(1); // 스크랩 성공 시 상태 업데이트
          window.location.reload(); // 페이지 새로고침
        } else {
          alert(response.data.message);
        }
      } else if (scrapCount === 1) {
        const response = await instance.delete(
          `${process.env.REACT_APP_SERVER_PORT}/booths/${booth.id}/scrap/`,
          config
        );
        console.log("Response: ", response); // 응답 로그 확인
        if (response.data.message === "스크랩 삭제") {
          setScrapCount(0); // 스크랩 취소 시 상태 업데이트
          window.location.reload(); // 페이지 새로고침
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error: ", error);
      if (error.response) {
        console.log("Error response data: ", error.response.data);
      }
      alert("스크랩 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <Booth
      isOpened={booth.is_opened}
      onClick={onClick}
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
          src={scrapCount === 1 ? scrapAfter : scrapBefore} // scrapCount 값에 따라 이미지 변경
          alt="Scrap"
          onClick={clickScrap}
        />

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
  max-width: 170px;
  max-height: 197px;
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
