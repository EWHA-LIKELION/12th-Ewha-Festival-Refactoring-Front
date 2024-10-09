// MenuImage.js
// MenuImage.js
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"; // useNavigate 추가
import BasicBooth from "../images/basicbooth.svg";
import scrapBefore from "../images/BoothDetail/scrapbefore.svg";
import scrapAfter from "../images/BoothDetail/scrapafter.svg";
import trash from "../images/BoothEdit/trash.svg";

const MenuImage = ({ menu }) => {
  const [isScraped, setIsScraped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate 초기화

  const clickScrap = () => {
    setIsScraped((prev) => !prev);
  };

  const handleTrashClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_PORT}/manages/${menu.booth}/menus/${menu.id}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data.message);
      setIsModalOpen(false);
      window.location.reload(); // 페이지를 강제로 새로 고침navigate("/booth-edit"); // 현재 경로를 다시 로드
    } catch (error) {
      console.error(error.response.data.detail || "메뉴 삭제에 실패했습니다.");
    }
  };

  const isBoothEdit = location.pathname.includes("/booth-edit");

  const handleImageClick = () => {
    navigate(`/booth-edit/addmenu`, { state: { menu } }); // 메뉴 데이터 전달
  };

  return (
    <Wrapper>
      <img
        className="menuImage"
        src={
          menu.img
            ? `${process.env.REACT_APP_SERVER_PORT}${menu.img}`
            : BasicBooth
        }
        alt="Menu"
        onClick={handleImageClick} // 이미지 클릭 시 이동
      />
      <BoothInfo>
        <MenuVegan>{menu.is_vegan}</MenuVegan>
        {isBoothEdit && (
          <img
            className="menuTrash"
            src={trash}
            alt="Trash"
            onClick={handleTrashClick}
          />
        )}
        {isBoothEdit ? null : (
          <img
            className="menuScrap"
            src={isScraped ? scrapAfter : scrapBefore}
            alt="Scrap"
            onClick={clickScrap}
          />
        )}
        <ScrapCount>{menu.scrap_count}</ScrapCount>
        <MenuName>{menu.menu}</MenuName>
        <Price>{menu.price}원</Price>
      </BoothInfo>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <Title>메뉴 삭제</Title>
            <Message>메뉴를 삭제하시겠습니까?</Message>
            <p>삭제된 내용은 되돌릴 수 없습니다.</p>
            <ModalButtons>
              <Button
                onClick={() => setIsModalOpen(false)}
                style={{ background: "#F7F7F7", color: "#BBBBBB" }}
              >
                아니요
              </Button>
              <Button
                onClick={handleConfirmDelete}
                style={{ background: "#00F16F", color: "white" }}
              >
                예
              </Button>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </Wrapper>
  );
};

export default MenuImage;

// 이하 스타일 컴포넌트는 동일

const Wrapper = styled.div`
  max-width: 170px;
  max-height: 197px;
  border-radius: 20px;
  box-shadow: 0px 0px 9px 0px rgba(255, 255, 255, 0.25) inset;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 17px;

  .menuImage {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0) 161.62%
    );
    border-radius: 20px;
    z-index: 2;
  }

  & > * {
    z-index: 3;
  }
`;

const ScrapCount = styled.div`
  color: var(--green_01, #00f16f);
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.5px;
  position: absolute;
  top: 2.8rem;
  right: 1.6rem;
  text-align: center;
`;
const BoothInfo = styled.div`
  img {
    position: absolute;
    top: 1.06rem;
    right: 0.87rem;
    cursor: pointer;
    z-index: 3;
  }
  .menuScrap,
  .menuTrash {
    cursor: pointer;
    z-index: 100;
  }
`;

const MenuVegan = styled.div`
  width: 46px;
  height: 20px;
  border-radius: 10px;
  background: rgba(0, 241, 111, 0.4);
  color: white;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  line-height: 20px;
  position: absolute;
  top: 15px;
`;
const MenuName = styled.div`
  color: var(--wh01, var(--wh, #fff));
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.3px;
`;

const Price = styled.div`
  color: var(--wh01, var(--wh, #fff));
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.5px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  text-align: center;
  width: 286px;
  height: 151px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;

  p {
    color: #928d8d;
    font-size: 10px;
    font-weight: 400;
    margin: 6px 0;
  }
`;

const Title = styled.h2`
  margin: 0;
  width: 286px;
  border-radius: 10px 10px 0 0;
  background: var(--green04, #1ef380);
  color: var(--wh01, var(--wh, #fff));
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Message = styled.div`
  margin-top: 10px;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
`;

const ModalButtons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  width: 183px;
`;

const Button = styled.div`
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid var(--gray02, #f2f2f2);
  text-align: center;
  font-family: Pretendard;
  font-weight: 700;
  width: 150px;
  height: 25px;
  margin: 6px;

  &:hover {
    background: ${({ confirm }) => (confirm ? "#45a049" : "#e53935")};
  }
`;

const ScrapWrapper = styled.div`
  display: flex;
`;
