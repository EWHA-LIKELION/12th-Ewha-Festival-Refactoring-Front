import React, { useState } from "react";
import styled from "styled-components";
import arrowdown from "../../images/BoothDetail/arrow-down.svg";

const BoothInfo = ({ boothData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Wrapper>
      <InfoWrapper>
        <div className="locationbox">
          <div className="locate">위치</div>
          <div className="location">
            {boothData?.booth_place || "위치 정보 없음"}
          </div>
        </div>
        <div className="runtimebox">
          <div className="runtime">운영시간</div>
          <div className="time">
            {boothData?.days.map((day, index) => (
              <div key={index} className="timeEntry">
                {day}
              </div>
            ))}
          </div>
        </div>
        <div className="introducebox">
          <div className="introduce">소개글</div>
          <div className={`introducemessage ${isExpanded ? "expanded" : ""}`}>
            {boothData?.description || "소개글이 없습니다."}
          </div>
          <img src={arrowdown} alt="Toggle" onClick={toggleExpand} />
        </div>
      </InfoWrapper>
      <MenuWrapper></MenuWrapper>
    </Wrapper>
  );
};

export default BoothInfo;

const Wrapper = styled.div`
  height: auto;
  width: 390px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoWrapper = styled.div`
  border-bottom: 1px solid #efefef;
  .locationbox {
    display: flex;
    margin-bottom: 20px;
    .locate {
      width: 80px;
    }
  }
  .runtimebox {
    display: flex;
    margin-bottom: 20px;
    .runtime {
      width: 80px;
    }
  }
  .introducebox {
    display: flex;
    margin-bottom: 20px;
    .introduce {
      width: 80px;
    }
    .introducemessage {
      width: 238px;
      max-height: 3em; /* 2줄 + 여유 공간을 고려한 높이 */
      overflow: hidden; /* 넘치는 내용 숨김 */
      text-overflow: ellipsis; /* 생략 기호 표시 */
      display: -webkit-box; /* Flexbox를 사용하여 제한된 줄 수 설정 */
      -webkit-box-orient: vertical; /* 세로 방향 설정 */
      -webkit-line-clamp: 2; /* 2줄로 제한 */
      transition: max-height 0.3s ease; /* 애니메이션 효과 */
    }
    .introducemessage.expanded {
      max-height: none; /* 전체 내용 보여주기 */
      display: block; /* 기본 display로 복원 */
      white-space: normal; /* 줄 바꿈 허용 */
    }
    img {
      cursor: pointer; /* 클릭 가능하게 표시 */
      margin-left: 10px; /* 이미지와 텍스트 간격 조정 */
      justify-self: flex-start;
      align-self: flex-start;
    }
  }
`;
const MenuWrapper = styled.div``;
