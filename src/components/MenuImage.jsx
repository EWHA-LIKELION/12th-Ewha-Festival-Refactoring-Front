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
      <Top>
        <div className="menuVegan">{menu.is_vegan}</div>
        {isBoothEdit && (
          <img
            className="menuTrash"
            src={trash}
            alt="Trash"
            onClick={handleTrashClick}
          />
        )}
        {isBoothEdit ? null : (
          <ScrapWrapper>
            <img
              className="menuScrap"
              src={isScraped ? scrapAfter : scrapBefore}
              alt="Scrap"
              onClick={clickScrap}
            />
            <div className="scrapCount">{menu.scrap_count}</div>
          </ScrapWrapper>
        )}
      </Top>
      <Bottom>
        <div className="menuName">{menu.menu}</div>
        <div className="price">{menu.price}원</div>
      </Bottom>
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
  flex-shrink: 0;
  border-radius: 20px;
  box-shadow: 0px 0px 9px 0px rgba(255, 255, 255, 0.25) inset;
  overflow: hidden;
  position: relative;

  .menuImage {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 8px;
  .menuVegan {
    width: 46px;
    height: 20px;
    border-radius: 10px;
    background: rgba(0, 241, 111, 0.4);
    color: white;
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
    text-align: center;
    line-height: 20px;
  }
  .menuScrap,
  .menuTrash {
    cursor: pointer;
    z-index: 100;
  }
`;

const Bottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  color: white;
  .menuName {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
  }
  .price {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
  }
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
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  p {
    color: #928d8d;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 6px 0 6px 0;
  }
`;

const Title = styled.h2`
  margin: 0;
  width: 286px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 10px 10px 0px 0px;
  background: var(--green04, #1ef380);
  color: var(--wh01, var(--wh, #fff));
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Message = styled.div`
  margin-top: 10px;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const ModalButtons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  width: 183px;
  height: 30px;
`;

const Button = styled.div`
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid var(--gray02, #f2f2f2);
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.5px;
  width: 150px;
  height: 25px;
  margin: 6px;

  &:hover {
    background: ${({ confirm }) => (confirm ? "#45a049" : "#e53935")};
  }
`;

const ScrapWrapper = styled.div`
  display: flex;
  .scrapCount {
  }
`;
