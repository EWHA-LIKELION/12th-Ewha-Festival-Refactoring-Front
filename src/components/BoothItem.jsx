import React, { useState, useEffect } from "react";
import instance from "../api/axios";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import BasicBooth from "../images/basicbooth.svg"; // 기본 부스 이미지 경로
import scrapBefore from "../images/BoothDetail/scrapbefore.svg";
import scrapAfter from "../images/BoothDetail/scrapafter.svg";

const BoothItem = ({ booth, onClick }) => {
  const [scrapCount, setScrapCount] = useState(booth.scrap_count); // booth.scrap_count 값을 초기 상태로 사용
  const [isscraped, setIsScraped] = useState(
    booth.is_scraped !== undefined ? booth.is_scraped : true
  );
  const navigate = useNavigate();
  const [scrapImg, setScrapImg] = useState(false); // booth.scrap_count 값을 초기 상태로 사용

  // booth.scrap_count가 변경될 때마다 scrapCount 상태를 업데이트
  useEffect(() => {
    setScrapCount(booth.scrap_count); // booth.scrap_count 값이 변경될 때 scrapCount를 업데이트
    setIsScraped(booth.is_scraped);
  }, [booth.scrap_count, booth.is_scraped]);

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

      if (!booth.is_scraped) {
        const response = await instance.post(
          `/booths/${booth.id}/scrap/`,
          {},
          config
        );
        console.log("Response: ", response); // 응답 로그 확인
      } else {
        const response = await instance.delete(
          `/booths/${booth.id}/scrap/`,

          config
        );
        console.log("Response: ", response); // 응답 로그 확인

        if (response.data.message === "스크랩 삭제") {
          console.log("Response: ", response);
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error: ", error);
      if (error.response.data === "이미 스크랩 하셨습니다.") {
        const response = await instance.delete(`/booths/${booth.id}/scrap/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response: ", response); // 응답 로그 확인

        if (response.data.message === "스크랩 삭제") {
          console.log("Response: ", response);
        } else {
          alert(response.data.message);
        }
      } else if (error.response.data === "취소할 스크랩이 없습니다.") {
        console.log(
          "Error response data:취소할 스크랩이 없습니다.: ",
          error.response.data
        );
        const response = await instance.post(`/booths/${booth.id}/scrap/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response: ", response);
      } else {
        console.log("Error response data 이것 ", error.response.data);
        const response = await instance.post(`/booths/${booth.id}/scrap/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response: ", response);
      }
      alert("스크랩 처리 중 오류가 발생했습니다.");
    }
  };

  const onClickScrap = () => {
    setScrapImg((scrapAfter) => scrapBefore);
  };

  const PlusScrap = async (e) => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await instance.post(`/booths/${booth.id}/scrap/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response: ", response);
      onClickScrap();
      e.preventDefault();
    } catch (error) {}
  };

  const DeleteScrap = async (e) => {
    const token = localStorage.getItem("accessToken");

    const response = await instance.delete(`/booths/${booth.id}/scrap/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response: ", response);
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
