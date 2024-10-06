import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import upBtn from "../images/triangle-up.svg";
import downBtn from "../images/triangle-down.svg";
import modal1 from "../images/modal1.svg";
import modal2 from "../images/modal2.svg";
import modal3 from "../images/modal3.svg";
import modal4 from "../images/modal4.svg";
import modal5 from "../images/modal5.svg";
import modal6 from "../images/modal6.svg";
import modal7 from "../images/modal7.svg";
import modal8 from "../images/modal8.svg";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <Backdrop>
          <ScrapbookButton onClick={() => navigate("/mypage")}>
            나의 스크랩북 열기
          </ScrapbookButton>
        </Backdrop>
      )}

      <Sheet isOpen={isOpen}>
        <HandleBar>
          <img
            src={isOpen ? downBtn : upBtn}
            alt="toggle"
            onClick={handleToggle}
          />
        </HandleBar>
        <Content>
          <Grid>
            <Item
              src={modal1}
              alt="부스 목록"
              onClick={() => navigate("/booth")}
            />
            <Item
              src={modal2}
              alt="공연 목록"
              onClick={() => navigate("/show")}
            />
            <Item
              src={modal3}
              alt="축준위 공지"
              onClick={() => navigate("NoticeList")}
            />
            <Item
              src={modal4}
              alt="축제 일정 및 상세 부스"
              onClick={() => navigate("/FestivalIntro")}
            />
            <Item
              src={modal5}
              alt="쓰레기통 및 그릇 반납"
              onClick={() => navigate("/trash")}
            />
            <Item
              src={modal6}
              alt="배리어 프리"
              onClick={() => navigate("/BarrierFree")}
            />
            <Item
              src={modal7}
              alt="대동제 소개"
              onClick={() => navigate("/about")}
            />
            <Item
              src={modal8}
              alt="만든 이들"
              onClick={() => navigate("/madeby")}
            />
          </Grid>
        </Content>
      </Sheet>
    </>
  );
};

export default Modal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 3;
`;

const Sheet = styled.div`
  border: 1px solid var(--gray04, #c1d9cc);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 390px;
  height: ${({ isOpen }) => (isOpen ? "80vh" : "3.5vh")};
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  z-index: 4;
  transition: height 0.3s ease-in-out;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const HandleBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.25rem auto 0;

  img {
    cursor: pointer;
  }
`;

const Content = styled.div`
  margin: 0.25rem auto 1.88rem;
  text-align: center;
  flex-grow: 1;
`;

const Grid = styled.div`
  justify-items: center;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 0.88rem;
  column-gap: 0.62rem;
`;

const Item = styled.img`
  width: 10.625rem;
  height: 12.3125rem;
  cursor: pointer;
`;

const ScrapbookButton = styled.button`
  position: fixed;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 11.75rem;
  height: 2.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 1.875rem;
  border: 1px solid var(--gray02, #f2f2f2);
  background: var(--wh, #fff);
  color: var(--green02, #03d664);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.0625rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25rem;
  letter-spacing: -0.03125rem;
  cursor: pointer;
`;
