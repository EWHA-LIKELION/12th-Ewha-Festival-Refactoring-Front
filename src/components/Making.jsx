import React from "react";
import styled from "styled-components";
import BasicBooth from "../images/basicbooth.svg"; // 기본 부스 이미지 경로

const Making = ({ major, makingname, part, detail, thumbnail }) => {
  return (
    <Booth
      style={{
        backgroundImage: `url(${thumbnail ? thumbnail : BasicBooth})`,
      }}
    >
      <BoothInfo>
        <Wrapper>
          <TextWrapper>
            <Major>{major}</Major>
            <BoothName>{makingname}</BoothName>
          </TextWrapper>
          <Part>{part}</Part>
        </Wrapper>
        <BoothLocation>{detail}</BoothLocation>
      </BoothInfo>
    </Booth>
  );
};

export default Making;

const Booth = styled.div`
  width: 170px;
  height: 197px;
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0) 161.62%
    ),
    url(<path-to-image>) lightgray 50% / cover no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: 0px 0px 9px 0px rgba(255, 255, 255, 0.25) inset;
  display: flex;
  padding: 17px;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  margin-top: 4px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BoothInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 197px;
`;

const Major = styled.div`
  color: var(--wh01, var(--wh, #fff));

  font-size: 8px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 250% */
  display: flex;
  width: 30px;
  height: 13px;
  flex-direction: column;
  justify-content: center;
`;

const Part = styled.div`
  color: var(--wh01, var(--wh, #fff));
  text-align: center;

  font-size: 8px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  padding: 0 6px 0 6px;
  letter-spacing: -0.5px;
  display: flex;
  width: 33px;
  height: 15px;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  background: var(--bk02, rgba(53, 60, 56, 0.8));
`;

const BoothName = styled.div`
  color: var(--wh01, var(--wh, #fff));

  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 100% */
  letter-spacing: -0.3px;
  margin-bottom: 4px;
`;

const BoothLocation = styled.div`
  color: var(--wh01, var(--wh, #fff));

  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px; /* 166.667% */
  letter-spacing: -0.5px;
`;
