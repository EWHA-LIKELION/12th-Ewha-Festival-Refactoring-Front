import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import BoothItem from "./BoothItem.jsx";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios.js";
import bookMark from "../images/bookMark.svg";

const MyPageScrap = () => {
  const [scrapData, setScrapData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("부스");
  const categories = ["부스", "메뉴", "공연"];
  const optionRefs = useRef([]);
  const navigate = useNavigate();

  const [highlightStyle, setHighlightStyle] = useState({});
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await instance.get(`/main/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.booths;
        setScrapData(data);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetchData();
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

  const filteredData = scrapData.filter((item) => {
    if (selectedCategory === "부스" && item.type === "booth") return true;
    if (selectedCategory === "메뉴" && item.type === "menu") return true;
    if (selectedCategory === "공연" && item.type === "show") return true;
    return false;
  });

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
            <img src={bookMark} alt="빈 스크랩" />
            스크랩한 내용이 아직 없어요🥹
          </NoScrapMessage>
        ) : (
          <ItemContainer>
            {filteredData.slice(0, itemsPerPage).map((item) => (
              <BoothItem key={item.id} booth={item} />
            ))}
          </ItemContainer>
        )}
      </Container>
    </Wrapper>
  );
};

export default MyPageScrap;

const Wrapper = styled.div`
  margin-top: 50px;
  border-radius: 0.9375rem;

  width: 100%;

  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  gap: 11px 7px;
  flex-wrap: wrap;
`;

const MenuSlider = styled.div`
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
  position: relative;

  left: 105px;
  top: 15px;
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

const Container = styled.div``;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 170px));

  box-sizing: border-box;
  grid-auto-rows: 197px;
  margin: 20px;
  gap: 7px;
`;

const NoScrapMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
  color: #03d664;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 0.9375rem;
  letter-spacing: -0.03125rem;
`;
