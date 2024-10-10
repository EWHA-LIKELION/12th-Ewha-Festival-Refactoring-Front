import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import BoothItem from "./BoothItem";
import MenuImage from "./MenuImage.jsx";
import { useNavigate } from "react-router-dom";
import moreScrap from "../images/moreScrap.svg";
import instance from "../api/axios.js";

const MainScrap = () => {
  const [scrapData, setScrapData] = useState({
    booths: [],
    menus: [],
    shows: [],
  });
  const [selectedCategory, setSelectedCategory] = useState("부스");
  const categories = ["부스", "메뉴", "공연"];
  const optionRefs = useRef([]);
  const navigate = useNavigate();

  const [highlightStyle, setHighlightStyle] = useState({});

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await instance.get(`/main/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // booths, menus, shows 데이터의 is_scraped 값을 강제로 true로 설정
      const boothsWithScrapTrue = response.data.booths.map((booth) => ({
        ...booth,
        is_scraped: true,
      }));

      const menusWithScrapTrue = response.data.menus.map((menu) => ({
        ...menu,
        is_scraped: true,
      }));

      const showsWithScrapTrue = response.data.shows.map((show) => ({
        ...show,
        is_scraped: true,
      }));
      setScrapData({
        booths: boothsWithScrapTrue,
        menus: menusWithScrapTrue,
        shows: showsWithScrapTrue,
      });
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  // 처음 데이터 가져오기
  useEffect(() => {
    fetchData();
  }, []);

  // is_scraped 값이 변경될 때마다 데이터 재가져오기
  useEffect(() => {
    const interval = setInterval(fetchData, 5000); // 5초마다 데이터 가져오기
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 클리어
  }, []);

  useEffect(() => {
    const currentIndex = categories.indexOf(selectedCategory);
    const currentRef = optionRefs.current[currentIndex];
    if (currentRef) {
      const { offsetLeft: left, clientWidth: width } = currentRef;
      setHighlightStyle({ left, width });
    }
  }, [selectedCategory]);

  const handleOption = (option) => {
    setSelectedCategory(option);
  };

  const filteredData =
    scrapData[
      selectedCategory === "부스"
        ? "booths"
        : selectedCategory === "메뉴"
        ? "menus"
        : "shows"
    ];

  return (
    <Wrapper>
      <MenuSlider>
        <Highlighter style={highlightStyle} />
        {categories.map((category, index) => (
          <CategoryBtn
            key={category}
            ref={(el) => (optionRefs.current[index] = el)}
            selected={selectedCategory === category}
            onClick={() => handleOption(category)}
          >
            {category}
          </CategoryBtn>
        ))}
      </MenuSlider>
      <Container>
        {filteredData.length === 0 ? (
          <NoScrapMessage>
            <img src={moreScrap} alt="빈 스크랩" />
            스크랩한 내용이 아직 없어요🥹
          </NoScrapMessage>
        ) : (
          <ItemContainer>
            {Array.from({ length: 4 }).map((_, index) => {
              if (filteredData[index]) {
                if (selectedCategory === "메뉴") {
                  return (
                    <MenuImage
                      key={filteredData[index].menu_pk}
                      menu={filteredData[index]}
                    />
                  );
                } else {
                  return (
                    <BoothItem
                      key={filteredData[index].id}
                      booth={filteredData[index]}
                    />
                  );
                }
              } else {
                return (
                  <NoScrapCard>
                    <img src={moreScrap} alt="빈 스크랩" />더 많은 스크랩으로
                    <br />
                    채워주세요
                  </NoScrapCard>
                );
              }
            })}
          </ItemContainer>
        )}
      </Container>
    </Wrapper>
  );
};

export default MainScrap;

const Wrapper = styled.div`
  position: relative;
  margin: 2.19rem auto 0;
  width: 77%;
  flex-shrink: 0;
  background: linear-gradient(
    158deg,
    rgba(245, 245, 245, 0.4) 3.91%,
    rgba(247, 247, 247, 0.4) 102.63%
  );

  aspect-ratio: 330 / 429;
  border-radius: 0.9375rem;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1), 0px 0px 4px 0px #fff inset;
  backdrop-filter: blur(10px);
  padding: 1.69rem 0.94rem;
  display: flex;
  flex-direction: column;
`;

const MenuSlider = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: max-content;
  height: 2.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.875rem;
  background: #c1d9cc;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const CategoryBtn = styled.div`
  padding: 0.5rem 1.0625rem;
  border-radius: 1.875rem;
  color: white;
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
  z-index: 1;
  position: relative;
`;

const Highlighter = styled.div`
  position: absolute;
  bottom: 0;
  height: 100%;
  background-color: #00f16f;
  border-radius: 1.875rem;
  transition: left 0.3s ease, width 0.3s ease;
  z-index: 0;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`;

const ItemContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0.44rem 0.69rem;
`;

const NoScrapMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
  color: var(--gray02, #f2f2f2);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: 0.9375rem;
  letter-spacing: -0.03125rem;

  img {
    width: 2.6875rem;
    height: 2.6875rem;
    flex-shrink: 0;
  }
`;

const NoScrapCard = styled.div`
  border-radius: 0.9375rem;
  border: 1px solid var(--wh02, rgba(251, 251, 251, 0.3));
  background: linear-gradient(
    336deg,
    rgba(0, 0, 0, 0.23) -71.64%,
    rgba(0, 0, 0, 0) 100.58%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
  color: var(--wh01, var(--wh, #fff));
  text-align: center;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: 0.9375rem; /* 125% */
  letter-spacing: -0.03125rem;

  img {
    width: 2.6875rem;
    height: 2.6875rem;
    flex-shrink: 0;
  }
`;
