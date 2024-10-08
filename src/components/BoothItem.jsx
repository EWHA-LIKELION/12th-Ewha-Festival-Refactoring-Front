import React, { useState } from "react";
import instance from "../api/axios.js";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import BasicBooth from "../images/basicbooth.svg"; // 기본 부스 이미지 경로
import scrapBefore from "../images/BoothDetail/scrapbefore.svg";
import scrapAfter from "../images/BoothDetail/scrapafter.svg";

const BoothItem = ({ booth, onClick }) => {
  const [isscraped, setisscraped] = useState(false);
  const navigate = useNavigate();

  const clickScrap = async () => {
    setisscraped(!isscraped);
    const token = localStorage.getItem("accessToken");

    if (token && isscraped === false) {
      try {
        const response = await instance.post(
          `${process.env.REACT_APP_SERVER_PORT}/booths/${booth.id}/scrap/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setisscraped(true);
      } catch (error) {
        console.error(error);
      }
    } else if (token && isscraped === true) {
      try {
        const response = await instance.delete(
          `${process.env.REACT_APP_SERVER_PORT}/booths/${booth.id}/scrap/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setisscraped(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("로그인을 해야 스크랩이 가능해요.");
      navigate("/login");
    }
  };

  return (
    <Booth
      isOpened={booth.is_opened}
      onClick={onClick} // 추가: BoothItem 클릭 시 onClick 호출
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
          src={isscraped ? scrapAfter : scrapBefore}
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

  /* 그라디언트를 ::before로 적용 */
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
    z-index: 2; /* 이미지 위에 그라디언트를 표시 */
  }

  /* 이 안의 내용이 그라디언트와 이미지 위에 올라오게 */
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
  }
`;

const BoothName = styled.div`
  color: var(--wh01, var(--wh, #fff));
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 100% */
  letter-spacing: -0.3px;
`;

const BoothLocation = styled.div`
  color: var(--wh01, var(--wh, #fff));
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 166.667% */
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
  border-radius: 20px; /* Booth의 border-radius와 동일하게 설정 */
  z-index: 2; /* 다른 요소들보다 앞에 오도록 z-index를 높임 */

  color: var(--wh01, var(--wh, #fff));
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 20px; /* 83.333% */
  letter-spacing: -0.3px;
`;
