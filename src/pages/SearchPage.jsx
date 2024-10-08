import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BoothItem from "../components/BoothItem"; // BoothItem 컴포넌트 불러오기
import { useLocation, useNavigate } from "react-router-dom"; // 네비게이션으로 받은 state 접근하기
import backIcon from "../images/backIcon.svg"; // 뒤로 가기 버튼 아이콘 추가
import searchIcon from "../images/search.svg";
import noresultIcon from "../images/noResult.png"; // 검색 아이콘 추가
import instance from "../api/axios"; // API 호출을 위한 axios 인스턴스
import Footer from "../components/Footer";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [booths, setBooths] = useState([]);
  const [notices, setNotices] = useState([]); // 공지사항 상태 추가
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchTerm, setSearchTerm] = useState(
    location.state?.searchTerm || ""
  ); // 검색어 상태 초기화

  useEffect(() => {
    // 검색 결과가 전달되면 상태에 저장
    if (location.state && location.state.booths) {
      setBooths(location.state.booths);
    }
    if (location.state && location.state.notices) {
      setNotices(location.state.notices); // 공지사항 데이터 저장
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
      setNotices(response.data.notices); // 공지사항도 업데이트
    } catch (error) {
      console.error("검색 오류:", error);
      setBooths([]); // 검색 결과가 없을 경우 빈 배열 설정
      setNotices([]); // 공지사항도 빈 배열 설정
    }
  };

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  // 선택된 카테고리에 맞는 부스/공연/공지사항 필터링
  const filteredBooths = booths.filter((booth) => {
    if (selectedCategory === "전체") {
      return true; // 전체 선택 시 모든 부스를 보여줌
    }
    return booth.type === selectedCategory;
  });

  const filteredNotices = selectedCategory === "notice" ? notices : [];

  // BoothItem 클릭 시 카테고리에 따라 상세 페이지로 이동하는 함수 추가
  const handleBoothItemClick = (booth) => {
    if (["음식", "굿즈", "체험"].includes(booth.category)) {
      // 부스일 경우
      navigate("/booth-detail", { state: { id: booth.id } });
    } else if (["밴드", "댄스"].includes(booth.category)) {
      // 공연일 경우
      navigate("/show-detail", { state: { id: booth.id } });
    }
  };

  return (
    <>
      <Wrapper>
        {/* 헤더 부분 */}
        <HeaderContainer>
          <BackButton onClick={handleBack}>
            <img src={backIcon} alt="뒤로 가기" />
          </BackButton>
          <Search>
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
              width="310"
              height="2"
              viewBox="0 0 310 2"
              fill="none"
            >
              <path d="M0 0.999969L310 0.999973" stroke="black" />
            </svg>
          </Search>
        </HeaderContainer>

        {/* 전체 카테고리에서 검색 결과가 없을 때 */}
        {selectedCategory === "전체" &&
        filteredBooths.length === 0 &&
        notices.length === 0 ? (
          <NoResult>
            <img src={noresultIcon} alt="결과 없음" />
          </NoResult>
        ) : (
          <>
            {/* 검색 결과가 있을 때만 검색 결과 표시 및 카테고리 바 렌더링 */}
            <SearchResult>
              총{" "}
              {filteredBooths.length +
                (selectedCategory === "전체"
                  ? notices.length
                  : filteredNotices.length)}
              개의 검색결과
            </SearchResult>
            <CategoryBar>
              <Category
                $selected={selectedCategory === "전체"}
                onClick={() => handleCategoryChange("전체")}
              >
                전체
              </Category>
              <Category
                $selected={selectedCategory === "booth"}
                onClick={() => handleCategoryChange("booth")}
              >
                부스
              </Category>
              <Category
                $selected={selectedCategory === "show"}
                onClick={() => handleCategoryChange("show")}
              >
                공연
              </Category>
              <Category
                $selected={selectedCategory === "notice"}
                onClick={() => handleCategoryChange("notice")}
              >
                공지사항
              </Category>
            </CategoryBar>

            {/* 검색 결과 표시 */}
            <BoothList hasItems={filteredBooths.length > 0}>
              {filteredBooths.map((booth) => (
                <BoothItem
                  key={booth.id}
                  booth={booth}
                  onClick={() => handleBoothItemClick(booth)} // 클릭 시 페이지 이동 함수 호출
                />
              ))}
            </BoothList>

            {/* 공지사항은 전체 카테고리일 때만 아래에 표시 */}
            {selectedCategory === "전체" && notices.length > 0 && (
              <>
                <NoticeList>
                  {notices.map((notice) => (
                    <NoticeItem key={notice.id}>
                      <a href={`/notice-detail/${notice.id}`}>{notice.name}</a>
                      <NoticeWrapper>
                        <NoticeAuthor>(준)축제준비위원회</NoticeAuthor>
                        <NoticeDate>{notice.created_at}</NoticeDate>
                      </NoticeWrapper>
                    </NoticeItem>
                  ))}
                </NoticeList>
              </>
            )}
          </>
        )}

        {/* 공지사항 카테고리를 선택했을 때만 공지사항만 표시 */}
        {selectedCategory === "notice" && (
          <NoticeList>
            {filteredNotices.map((notice) => (
              <NoticeItem key={notice.id}>
                <a href={`/notice-detail/${notice.id}`}>{notice.name}</a>
                <NoticeWrapper>
                  <NoticeAuthor>(준)축제준비위원회</NoticeAuthor>
                  <NoticeDate>{notice.created_at}</NoticeDate>
                </NoticeWrapper>
              </NoticeItem>
            ))}
          </NoticeList>
        )}
      </Wrapper>
      <Footer />
    </>
  );
};

export default SearchPage;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  max-width: 390px;
  display: flex;
  flex-direction: column;
  padding: 27px 20px 301px 20px;
`;

const BoothList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  grid-auto-rows: 197px;
  margin-top: 17px;
  margin-bottom: ${(props) =>
    props.hasItems ? "33px" : "0px"}; /* 조건부 margin-bottom */
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 13px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: 15px;
`;

const Search = styled.div`
  display: flex;
  width: 311px;
  padding: 9px 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const SearchInput = styled.input`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.5px;
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #c1d9cc;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: -0.5px;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const CategoryBar = styled.div`
  display: flex;
  margin-bottom: 0px;
`;

/* 카테고리 버튼에 $selected prop 추가 */
const Category = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 7px 17px;
  height: 34px;
  border-radius: 30px;
  border: 1px solid ${(props) => (props.$selected ? "#03d664" : "#F2F2F2")};
  background-color: ${(props) => (props.$selected ? "#00f16f" : "#F7F7F7")};
  cursor: pointer;

  color: ${(props) => (props.$selected ? "#FFF" : "#BBB")};
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.5px;
  margin-right: 10px;
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
  margin-bottom: 17px;
`;

const NoResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 203px;
`;

const NoticeList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 0px;
`;

const NoticeItem = styled.li`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 15px;
  border: 1px solid var(--gray04, #c1d9cc);
  background: var(--wh, #fff);

  color: var(--bk01, #000);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.5px;

  margin-bottom: 15px;

  a {
    color: var(--bk01, #000);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: -0.5px;
    text-decoration-line: none;
  }
`;

const NoticeWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const NoticeAuthor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 87px;
  height: 15px;
  color: var(--green01, var(--green_01, #00f16f));
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: -0.5px;
`;

const NoticeDate = styled.div`
  margin-left: 10px;
  display: flex;
  width: 228px;
  height: 15px;
  flex-direction: column;
  justify-content: center;
  color: var(--gray05, #8e8e8e);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.5px;
`;
