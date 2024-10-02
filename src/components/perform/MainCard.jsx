import React from "react";
import styled from "styled-components";
function MainCard({ img, isText = false }) {
  return (
    <Wrap>
      <img src={img} alt="공연" />
      {/*백 연결할 때 수정하기, 화면 퍼블리싱만 먼저*/}
      {isText && (
        <div className="description">
          <h2>공연명입니다</h2>
          <p>학문관광장 · 밴드</p>
        </div>
      )}
    </Wrap>
  );
}

export default MainCard;

const Wrap = styled.div`
  * {
    margin: 0;
    padding: 0;
  }
  position: relative;
  width: 350px;
  height: 197px;
  margin-top: 16px;

  img {
    display: inline-flex;
    height: 197px;
    align-items: center;
    flex-shrink: 0;
    border-radius: 15px;
    box-shadow: 0px 0px 9px 0px rgba(255, 255, 255, 0.25) inset;
    width: 100%;
  }

  .description {
    position: absolute;
    top: 133px;
    left: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 8px;
    color: white;

    h2 {
      color: #fff;
      font-size: 24px;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: -0.3px;
    }
    p {
      color: #fff;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: -0.5px;
    }
  }
`;
