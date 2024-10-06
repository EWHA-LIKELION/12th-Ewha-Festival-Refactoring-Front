import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BoothItem from "../components/BoothItem"; // BoothItem 컴포넌트 불러오기
import { useLocation, useNavigate } from "react-router-dom"; // 네비게이션으로 받은 state 접근하기
import backIcon from "../images/backIcon.svg"; // 뒤로 가기 버튼 아이콘 추가
import searchIcon from "../images/search.svg"; // 검색 아이콘 추가
import instance from "../api/axios"; // API 호출을 위한 axios 인스턴스

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [booths, setBooths] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchTerm, setSearchTerm] = useState(
    location.state?.searchTerm || ""
  ); // 검색어 상태 초기화

  useEffect(() => {
    // 검색 결과가 전달되면 상태에 저장
    if (location.state && location.state.booths) {
      setBooths(location.state.booths);
    }
  }, [location.state]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = async () => {
    console.log("검색어:", searchTerm);

    try {
      const response = await instance.get(
        `${process.env.REACT_APP_SERVER_PORT}/main/search`, // api 명세에 맞게 수정
        {
          params: {
            q: searchTerm, // 입력된 검색어 전달
          },
        }
      );

      console.log("검색 결과:", response.data.booths);

      // 검색 결과를 받아와서 상태 업데이트
      setBooths(response.data.booths);
    } catch (error) {
      console.error("검색 오류:", error);
      setBooths([]); // 검색 결과가 없을 경우 빈 배열 설정
    }
  };

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  // 선택된 카테고리에 맞는 부스/공연 필터링
  const filteredBooths = booths.filter((booth) => {
    if (selectedCategory === "전체") {
      return true; // 전체 선택 시 모든 부스를 보여줌
    }
    return booth.type === selectedCategory;
  });

  return (
    <>
      {/* 헤더 부분 */}
      <HeaderContainer>
        <BackButton onClick={handleBack}>
          <img src={backIcon} alt="뒤로 가기" />
        </BackButton>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="검색어를 입력해 주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <SearchButton onClick={handleSearch}>
            <img src={searchIcon} alt="search" />
          </SearchButton>
        </SearchBar>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="349"
          height="2"
          viewBox="0 0 349 2"
          fill="none"
        >
          <path d="M0 1.00003L349 0.999969" stroke="black" />
        </svg>
      </HeaderContainer>

      <Wrapper>
        <CategoryBar>
          <Category
            selected={selectedCategory === "전체"}
            onClick={() => handleCategoryChange("전체")}
          >
            전체
          </Category>
          <Category
            selected={selectedCategory === "부스"}
            onClick={() => handleCategoryChange("booth")}
          >
            부스
          </Category>
          <Category
            selected={selectedCategory === "공연"}
            onClick={() => handleCategoryChange("show")}
          >
            공연
          </Category>
        </CategoryBar>

        {/* 검색 결과가 없을 경우 */}
        {filteredBooths.length === 0 ? (
          <NoResult>
            <ExclamationMark>!</ExclamationMark>
            <NoResultText>검색결과를 찾을 수 없어요😱</NoResultText>
          </NoResult>
        ) : (
          <>
            <SearchResult>총 {filteredBooths.length}개의 부스</SearchResult>
            <BoothList>
              {filteredBooths.map((booth) => (
                <BoothItem key={booth.id} booth={booth} />
              ))}
            </BoothList>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default SearchPage;

/* 스타일 정의 */

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  flex-direction: column; /* 검색창과 라인 정렬을 위해 column으로 설정 */
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-bottom: 10px; /* 위쪽에 여백 추가 */
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 5px 8px;
  margin-bottom: 10px; /* SVG와의 간격을 주기 위해 추가 */
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding-left: 8px;
  font-size: 14px;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

// 나머지 스타일 코드는 그대로 유지합니다.

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  max-width: 390px;
  display: flex;
  flex-direction: column;
  padding-left: 17px;
  padding-right: 17px;
`;

const CategoryBar = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 16px;
`;

const Category = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  padding: 8px 0;
  border-radius: 30px;
  border: 1px solid ${(props) => (props.selected ? "#03d664" : "#C1D9CC")};
  background-color: ${(props) => (props.selected ? "#00f16f" : "#C1D9CC")};
  cursor: pointer;

  color: var(--wh01, var(--wh, #fff));
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
`;

const SearchResult = styled.div`
  width: 151px;
  height: 15px;
  flex-shrink: 0;
  color: var(--gray05, #8e8e8e);
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.5px;
  margin-bottom: 9px;
`;

const BoothList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 170px));
  gap: 16px;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
`;

const NoResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

const ExclamationMark = styled.div`
  font-size: 48px;
  color: #4caf50;
`;

const NoResultText = styled.div`
  font-size: 18px;
  color: #4caf50;
  text-align: center;
`;
