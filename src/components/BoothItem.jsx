import React, { useState } from "react";
import instance from "../api/axios.js";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import BasicBooth from "../images/basicbooth.svg"; // 기본 부스 이미지 경로
import scrapBefore from "../images/BoothDetail/scrapbefore.svg";
import scrapAfter from "../images/BoothDetail/scrapafter.svg";

const BoothItem = ({ booth }) => {
  const [isscraped, setisscraped] = useState(false);
  const navigate = useNavigate();

  const clickScrap = async () => {
    setisscraped(!isscraped);
    const token = localStorage.getItem("accessToken");

    if (token && isscraped === false) {
      try {
        const response = await instance.post(
          `${process.env.REACT_APP_SERVER_PORT}/booths/${booth.id}/scrap/`,
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
      isOpened={booth.is_opened} // Pass the is_opened value as a prop
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
        {!booth.is_opened && <ClosedLabel>운영 종료</ClosedLabel>}{" "}
        {/* Display the closed label when booth is closed */}
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
  width: 170px;
  height: 197px;
  background: ${(props) =>
    props.isOpened
      ? "linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 161.62%)"
      : "rgba(0, 255, 0, 0.3)"};
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
`;

const BoothInfo = styled.div`
  img {
    position: absolute;
    top: 17px;
    left: 130px;
    cursor: pointer;
  }
`;

const BoothName = styled.div`
  color: var(--wh01, var(--wh, #fff));
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.3px;
  margin-bottom: 4px;
`;

const BoothLocation = styled.div`
  color: var(--wh01, var(--wh, #fff));
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.5px;
`;

const ClosedLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 10px;
`;
