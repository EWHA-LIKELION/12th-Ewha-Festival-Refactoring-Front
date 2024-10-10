import React, { useState, useEffect } from "react";
import styled from "styled-components";
import arrowDown from "../../images/arrow-down.svg";
import instance from "../../api/axios";

function PerformInfo({ boothId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [performData, setPerformData] = useState(null);
  const [error, setError] = useState(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

	useEffect(() => {
		// 데이터 가져오기
		const fetchPerformInfo = async () => {
			try {
				console.log("Fetching data for boothId:", boothId); // boothId 확인
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
    return <div>로딩 중...</div>;
  }

  return (
    <Wrap>
      <Item>
        <Label>공연명</Label>
        <Content>
          <p>{performData.name}</p>
        </Content>
      </Item>
      <Item>
        <Label>위치</Label>
        <Content>
          <p>{performData.booth_place}</p>
        </Content>
      </Item>
      <Item>
        <Label>카테고리</Label>
        <Content>
          <p>{performData.category}</p>
        </Content>
      </Item>
      <Item>
        <Label>운영시간</Label>
        <Content>
          {performData.days.map((day, index) => (
            <p key={index}>{day}</p>
          ))}
        </Content>
      </Item>
      <Item>
        <Label>부스소개</Label>
        <Description isExpanded={isExpanded}>
          <p>{performData.description}</p>
          <button onClick={toggleExpand}>
            <img src={arrowDown} alt="Toggle arrow" className={isExpanded ? "rotated" : ""} />
          </button>
        </Description>
      </Item>
    </Wrap>
  );
}

export default PerformInfo;

const Wrap = styled.div`
  width: 352px;
  margin: 0 auto;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Item = styled.div`
  display: flex;
  gap: 18px;
`;

const Label = styled.span`
  color: var(--bk01, #000);
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.5px;
  display: inline-block;
  width: 55px;
`;

const Content = styled.div`
  p {
    margin: 0;
    line-height: 20px;
    letter-spacing: -0.5px;
  }
  color: var(--bk01, #000);
  font-size: 13px;
  font-weight: 400;
  width: 270px;
`;

const Description = styled(Content)`
  display: flex;
  gap: 18px;

  p {
    max-height: ${(props) => (props.isExpanded ? "none" : "20px")};
    overflow: hidden;
    white-space: ${(props) => (props.isExpanded ? "normal" : "nowrap")};
    text-overflow: ellipsis;
  }

  button {
    width: 19px;
    height: 19px;
    border: none;
    background-color: transparent;

    img {
      transition: transform 0.3s ease;
      &.rotated {
        transform: rotate(180deg);
      }
    }
  }
`;