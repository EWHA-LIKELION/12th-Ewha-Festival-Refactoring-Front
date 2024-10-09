import React from "react";
import styled from "styled-components";
import BasicEvent from "../images/TFEvent.svg"; // 기본 부스 이미지 경로

const TFEventItem = ({ booth }) => {
  return (
    <Booth>
      <BoothInfo>
        <BoothName>{booth.name}</BoothName>
        <BoothLocation>
          {booth.booth_place} &nbsp; {booth.days}
        </BoothLocation>
      </BoothInfo>
    </Booth>
  );
};

export default TFEventItem;

const Booth = styled.div`
  width: 80vw;
  max-width: 312px;
  height: 46px;
  flex-shrink: 0;
  background: url(${BasicEvent}) lightgray 50% / cover no-repeat;
  border-radius: 10px;
  padding: 17px 19px;
`;

const BoothInfo = styled.div``;

const BoothName = styled.div`
  color: var(--wh01, var(--wh, #fff));
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 137.5% */
  letter-spacing: -0.5px;
  margin-bottom: 2px;
`;

const BoothLocation = styled.div`
  color: var(--wh01, var(--wh, #fff));
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 183.333% */
  letter-spacing: -0.5px;
`;
