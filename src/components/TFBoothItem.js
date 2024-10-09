import React from "react";
import styled from "styled-components";
import TFBooth from "../images/TFBooth.svg"; // 기본 부스 이미지 경로

const TFBoothItem = ({ booth }) => {
  return (
    <Booth>
      <a href={`/booths/${booth.id}`}>
        <BoothInfo>
          <BoothName>{booth.name}</BoothName>
          <BoothLocation>
            {booth.booth_place}
            <br />
            {booth.days}
          </BoothLocation>
        </BoothInfo>
      </a>
    </Booth>
  );
};

export default TFBoothItem;

const Booth = styled.div`
  width: 43.5vw;
  max-width: 170px;
  height: 284px;
  border-radius: 15px;
  border: 1px solid var(--gray04, #c1d9cc);
  background: url(${TFBooth}) lightgray 50% / cover no-repeat;

  /* display: grid; <- 이 부분을 제거하거나 아래처럼 수정 */
  display: block;

  /* 기존 코드 유지 */
  gap: 16px;
  a {
    text-decoration-line: none;
  }
`;

const BoothInfo = styled.div`
  width: 35.9vw;
  max-width: 140px;
  height: 122px;
  flex-shrink: 0;
  background: var(--bk02, rgba(53, 60, 56, 0.8));
  border-radius: 0 0 15px 15px;
  margin-top: 162px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 15px;
`;

const BoothName = styled.div`
  color: var(--wh01, var(--wh, #fff));
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 137.5% */
  letter-spacing: -0.5px;
`;

const BoothLocation = styled.div`
  color: var(--gray01, #bbb);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 183.333% */
  letter-spacing: -0.5px;
`;
