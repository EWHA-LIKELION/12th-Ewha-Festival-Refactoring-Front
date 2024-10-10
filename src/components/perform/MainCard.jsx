import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instance from "../../api/axios";

function MainCard({ img, isText = false, boothId }) {
  const [performData, setPerformData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 데이터 가져오기
    const fetchPerformInfo = async () => {
      try {
        console.log("Fetching data for boothId:", boothId); // boothId 로그 확인
        const response = await instance.get(`/shows/${boothId}/`);
        setPerformData(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err); // 에러 메시지 출력
        setError("공연 정보를 불러오는 데 실패했습니다.");
      }
    };

    fetchPerformInfo();
  }, [boothId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!performData) {
    return <div>로딩 중...</div>; // 로딩 중 메시지 추가
  }

  return (
    <Wrap>
      <img src={img} alt="공연" />
      {isText && performData && (
        <div className="description">
          <h2>{performData.name}</h2>
          <p>{performData.booth_place} · {performData.category}</p>
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
