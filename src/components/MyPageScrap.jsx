import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import BoothItem from "./BoothItem.jsx";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios.js";
import bookMark from "../images/bookMark.svg";
import MenuImage from "./MenuImage.jsx";

const MyPageScrap = () => {
  const [scrapData, setScrapData] = useState({
    booths: [],
    menus: [],
    shows: [],
  });
  const [selectedCategory, setSelectedCategory] = useState("부스");
  const categories = ["부스", "메뉴", "공연"];
  const optionRefs = useRef([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 8;
  const [highlightStyle, setHighlightStyle] = useState({});

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await instance.get(`/main/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const boothsWithScrapTrue = response.data.booths.map((booth) => ({
        ...booth,
        is_scraped: true,
      }));
      const { menus, shows } = response.data;
      setScrapData({
        booths: boothsWithScrapTrue,
        menus,
        shows,
      });
      console.log(response.data);
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
    setCurrentPage(1);
  };

  const filteredData =
    scrapData[
      selectedCategory === "부스"
        ? "booths"
        : selectedCategory === "메뉴"
        ? "menus"
        : "shows"
    ];

  const boothsPerPage = 10; // 한 페이지당 보여줄 부스 수
  const maxPageButtons = 5; // 한번에 보여줄 페이지 버튼의 최대 개수
  const [pageGroup, setPageGroup] = useState(0); // 페이지 그룹 상태

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / boothsPerPage);

  // 페이지네이션 계산
  const indexOfLastBooth = currentPage * boothsPerPage;
  const indexOfFirstBooth = indexOfLastBooth - boothsPerPage;
  const currentBooths = filteredData.slice(indexOfFirstBooth, indexOfLastBooth);
  // 페이지네이션에서 표시할 페이지 번호 그룹 계산
  const startPage = pageGroup * maxPageButtons + 1;
  const endPage = Math.min((pageGroup + 1) * maxPageButtons, totalPages);

  // 화살표 클릭 시 페이지 그룹 이동
  const handleNextPageGroup = () => {
    if ((pageGroup + 1) * maxPageButtons < totalPages) {
      setPageGroup(pageGroup + 1);
    }
  };

  const handlePrevPageGroup = () => {
    if (pageGroup > 0) {
      setPageGroup(pageGroup - 1);
    }
  };

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
            {filteredData.slice(0, itemsPerPage).map((item, index) => {
              if (selectedCategory === "메뉴") {
                return <MenuImage key={item.menu_pk} menu={item} />;
              } else {
                return <BoothItem key={item.id} booth={item} />;
              }
            })}
          </ItemContainer>
        )}
      </Container>
      <Pagination>
        {pageGroup > 0 && (
          <ArrowButtonLeft onClick={handlePrevPageGroup}>
            <svg
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 7.00688L12 9.92965C12 13.553 9.64853 15.0417 6.77673 13.2246L4.46529 11.7577L2.15385 10.2909C-0.717949 8.47374 -0.717949 5.50719 2.15385 3.69004L4.46529 2.22319L6.77674 0.756339C9.64853 -1.02797 12 0.449832 12 4.08413L12 7.00688Z"
                fill="#F2F2F2"
              />
            </svg>
          </ArrowButtonLeft>
        )}
        {Array.from({ length: endPage - startPage + 1 }, (_, idx) => (
          <PageButton
            key={startPage + idx}
            onClick={() => setCurrentPage(startPage + idx)}
            selected={currentPage === startPage + idx}
          >
            {startPage + idx}
          </PageButton>
        ))}
        {(pageGroup + 1) * maxPageButtons < totalPages && (
          <ArrowButtonRight onClick={handleNextPageGroup}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
            >
              <path
                d="M0 6.99361V4.27962C0 0.915079 2.35147 -0.467329 5.22326 1.22002L7.53471 2.5821L9.84615 3.94418C12.7179 5.63153 12.7179 8.38618 9.84615 10.0735L7.53471 11.4356L5.22326 12.7977C2.35147 14.4545 0 13.0823 0 9.7076V6.99361Z"
                fill="#F2F2F2"
              />
            </svg>
          </ArrowButtonRight>
        )}
      </Pagination>
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
  margin-top: 100px;
`;

/* 페이지 넘버 */
const Pagination = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 300px;
`;

const PageButton = styled.button`
  display: flex;
  width: 38px;
  padding: 8px 17px;
  justify-content: center;
  align-items: center;
  gap: 3px;
  margin-left: 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.selected ? "#00F16F" : "#F7F7F7")};
  border: 1px solid ${(props) => (props.selected ? "#03D664" : "#F2F2F2")};
  cursor: pointer;

  color: ${(props) => (props.selected ? "#FFF" : "#BBB")};
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.5px;
`;

const ArrowButtonLeft = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: none;
  cursor: pointer;
  padding: 0px;
`;

const ArrowButtonRight = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: none;
  cursor: pointer;
  padding: 0px;
  margin-left: 10px;
`;
