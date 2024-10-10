import React, { useState, useEffect } from "react";
import instance from "../api/axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BasicBooth from "../images/basicbooth.svg";
import scrapBefore from "../images/BoothDetail/scrapbefore.svg";
import scrapAfter from "../images/BoothDetail/scrapafter.svg";

const MenuImage = ({ menu }) => {
  const [scrapCount, setScrapCount] = useState(menu.scrap_count || 0);
  const [isScraped, setIsScraped] = useState(menu.is_scraped || false);
  const navigate = useNavigate();

  useEffect(() => {
    if (menu) {
      setScrapCount(menu.scrap_count || 0);
      setIsScraped(menu.is_scraped || false);
    }
  }, [menu]);

  const clickScrap = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("로그인을 해야 스크랩이 가능해요.");
      navigate("/login");
      return;
    }

    try {
      let response;
      if (isScraped) {
        response = await instance.delete(
          `/manages/${menu.booth}/menus/${menu.id}/scrap/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setScrapCount((prevCount) => prevCount - 1);
          setIsScraped(false);
        }
      } else {
        response = await instance.post(
          `/manages/${menu.booth}/menus/${menu.id}/scrap/`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setScrapCount((prevCount) => prevCount + 1);
          setIsScraped(true);
        }
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("스크랩 처리 중 오류가 발생했습니다.");
    }
  };

  const handleMenuClick = () => {
    navigate("/menu-detail", {
      state: { id: menu.id },
    });
  };

  return (
    <Wrapper
      onClick={handleMenuClick}
      style={{
        backgroundImage: `url(${
          menu.img
            ? `${process.env.REACT_APP_SERVER_PORT}${menu.img}`
            : BasicBooth
        })`,
      }}
    >
      <MenuInfo>
        <img
          src={isScraped ? scrapAfter : scrapBefore}
          alt="Scrap"
          onClick={clickScrap}
        />
        <ScrapCount>{scrapCount}</ScrapCount>
        <MenuName>{menu.menu}</MenuName>
        <Price>{menu.price}원</Price>
      </MenuInfo>
    </Wrapper>
  );
};

export default MenuImage;

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
  background-size: cover;
  background-position: center;
`;

const MenuInfo = styled.div`
  img {
    position: absolute;
    top: 1.06rem;
    right: 0.87rem;
    cursor: pointer;
    z-index: 3;
  }
`;

const ScrapCount = styled.div`
  color: var(--green_01, #00f16f);
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.5px;
  position: absolute;
  top: 2.8rem;
  right: 1.6rem;
  text-align: center;
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
