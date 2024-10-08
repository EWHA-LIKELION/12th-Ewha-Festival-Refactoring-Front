import React, { useState } from "react";
import styled from "styled-components";
import 임시메뉴이미지 from "../images/BoothDetail/임시메뉴이미지.svg";
import scrapBefore from "../images/BoothDetail/scrapbefore.svg";
import scrapAfter from "../images/BoothDetail/scrapafter.svg";

const MenuImage = () => {
  const [isscraped, setisccraped] = useState(false);

  const clickScrap = () => {
    setisccraped(!isscraped);
  };
  return (
    <Wrapper>
      <img className="menuImage" src={임시메뉴이미지} alt="Menu" />
      <Top>
        <div className="menucatagory"></div>
        <img
          className="menuscrap"
          src={isscraped ? scrapAfter : scrapBefore}
          alt="Scrap"
          onClick={clickScrap}
        />
      </Top>
      <Bottom>
        <div className="menuName">메뉴명입니다</div>
        <div className="price">4000원</div>
      </Bottom>
    </Wrapper>
  );
};

export default MenuImage;

const Wrapper = styled.div`
  margin: 10px;
  width: 170px;
  height: 197px;
  flex-shrink: 0;
  border-radius: 20px;
  box-shadow: 0px 0px 9px 0px rgba(255, 255, 255, 0.25) inset;
  overflow: hidden; /* 내용이 넘칠 경우 숨김 */
  position: relative; /* 내부 요소의 위치를 조정할 수 있도록 설정 */
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* 가운데 정렬 */
  position: absolute; /* Wrapper의 위치를 기준으로 위치 설정 */
  top: 0; /* Wrapper 상단에 위치 */
  left: 0; /* Wrapper 좌측에 위치 */
  right: 0; /* Wrapper 우측에 위치 */
  padding: 8px; /* Padding을 추가하여 여유 공간 확보 */
  .menucatagory {
    width: 46px;
    height: 20px;
    border-radius: 10px;
    background: rgba(0, 241, 111, 0.4);
  }
  .menuscrap {
    cursor: pointer;
  }
`;

const Bottom = styled.div`
  position: absolute; /* Wrapper의 위치를 기준으로 위치 설정 */
  bottom: 0; /* Wrapper 하단에 위치 */
  left: 0; /* Wrapper 좌측에 위치 */
  right: 0; /* Wrapper 우측에 위치 */
  padding: 8px; /* Padding을 추가하여 여유 공간 확보 */
  .menuName {
    font-weight: bold; /* 메뉴명 두껍게 표시 */
  }
`;
