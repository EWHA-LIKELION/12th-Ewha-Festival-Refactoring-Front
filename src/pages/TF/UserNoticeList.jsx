import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import instance from "../../api/axios";
import searchicon from "../../images/searchicon.svg";
import createicon from "../../images/createicon.svg";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

function UserNoticeList() {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]); // 필터링된 공지 리스트
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageGroup, setPageGroup] = useState(0);
  const navigate = useNavigate();

  const noticesPerPage = 5;
  const maxPageButtons = 5;

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const url =
          activeFilter === "all"
            ? `${process.env.REACT_APP_SERVER_PORT}/notice/list/?page=${currentPage}`
            : `${process.env.REACT_APP_SERVER_PORT}/notice/list/?type=${activeFilter}&page=${currentPage}`;
        console.log(`Fetching notices from: ${url}`);
        const response = await instance.get(url);
        console.log("Fetched notices:", response.data.results);

        const sortedNotices = response.data.results.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });

        setNotices(sortedNotices);
        setFilteredNotices(sortedNotices); // 초기에는 모든 공지글이 필터링된 상태로 설정
        setTotalCount(response.data.count);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, [currentPage, activeFilter]);

  const filterNotices = (type) => {
    console.log(`Filtering notices by type: ${type}`);
    setActiveFilter(type);
    setCurrentPage(1);
    setPageGroup(0);
  };

  const searchNotices = (term) => {
    console.log(`Searching notices with term: ${term}`);
    setSearchTerm(term);

    // 클라이언트 사이드 필터링
    const filtered = notices.filter((notice) =>
      notice.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredNotices(filtered); // 필터링된 공지글 상태 업데이트
    setTotalCount(filtered.length); // 필터링된 공지글의 개수 업데이트
  };

  const handleNextPageGroup = () => {
    if (
      (pageGroup + 1) * maxPageButtons <
      Math.ceil(totalCount / noticesPerPage)
    ) {
      setPageGroup(pageGroup + 1);
      setCurrentPage((pageGroup + 1) * maxPageButtons + 1);
      console.log(`Moved to next page group: ${pageGroup + 1}`);
    }
  };

  const handlePrevPageGroup = () => {
    if (pageGroup > 0) {
      setPageGroup(pageGroup - 1);
      setCurrentPage((pageGroup - 1) * maxPageButtons + 1);
      console.log(`Moved to previous page group: ${pageGroup - 1}`);
    }
  };

  const startPage = pageGroup * maxPageButtons + 1;
  const endPage = Math.min(
    (pageGroup + 1) * maxPageButtons,
    Math.ceil(totalCount / noticesPerPage)
  );

  const handlePageClick = (page) => {
    setCurrentPage(page);
    console.log(`Navigated to page: ${page}`);
  };

  return (
    <Wrapper>
      <Header />
      <TopContainer>
        <Title>공지 사항</Title>
        <SearchBar>
          <input
            type="text"
            placeholder="공지사항 검색"
            value={searchTerm}
            onChange={(e) => {
              searchNotices(e.target.value);
            }}
          />
          <img src={searchicon} alt="search icon" />
        </SearchBar>

        <Filter>
          <FilterButton
            onClick={() => filterNotices("all")}
            active={activeFilter === "all"}
          >
            전체 공지
          </FilterButton>
          <FilterButton
            onClick={() => filterNotices("operational")}
            active={activeFilter === "operational"}
          >
            운영 공지
          </FilterButton>
          <FilterButton
            onClick={() => filterNotices("event")}
            active={activeFilter === "event"}
          >
            행사 공지
          </FilterButton>
        </Filter>

        <ul>
          {filteredNotices.map((notice) => {
            const createdAtDate = new Date(notice.created_at);
            const formattedDate = createdAtDate.toISOString().split("T")[0];

            return (
              <li key={notice.id}>
                <a href={`/notice/${notice.id}`}>{notice.title}</a>
                <div>
                  <h3>(준)축제준비위원회 {notice.author}</h3>
                  <h4>{formattedDate}</h4>
                </div>
              </li>
            );
          })}
        </ul>

        <Pagination>
          {pageGroup > 0 && (
            <ArrowButtonLeft onClick={handlePrevPageGroup}>
              &lt;
            </ArrowButtonLeft>
          )}
          {Array.from({ length: endPage - startPage + 1 }, (_, idx) => (
            <PageButton
              key={startPage + idx}
              onClick={() => handlePageClick(startPage + idx)}
              selected={currentPage === startPage + idx}
            >
              {startPage + idx}
            </PageButton>
          ))}
          {(pageGroup + 1) * maxPageButtons <
            Math.ceil(totalCount / noticesPerPage) && (
            <ArrowButtonRight onClick={handleNextPageGroup}>
              &gt;
            </ArrowButtonRight>
          )}
        </Pagination>
      </TopContainer>
      <Footer />
    </Wrapper>
  );
}

export default UserNoticeList;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const ArrowButtonLeft = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const ArrowButtonRight = styled(ArrowButtonLeft)``;

const PageButton = styled.button`
  background: ${({ selected }) =>
    selected ? "#00F16F" : "var(--gray03, #f7f7f7)"};
  border: 1px solid var(--gray02, #f2f2f2);
  border-radius: 5px;
  margin: 0 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 700;
  color: ${({ selected }) => (selected ? "#FFFFFF" : "var(--gray01, #bbb)")};
`;

const TopContainer = styled.div`
  max-width: 390px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 75px;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      width: 325px;
      height: 47px;
      display: flex;
      padding: 20px;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      border-radius: 15px;
      border: 1px solid var(--green02, #03d664);
      background: var(--wh, #fff);
      margin-bottom: 15px;

      a {
        color: var(--bk01, #000);
        font-family: Pretendard;
        font-size: 16px;
        font-weight: 600;
        line-height: 22px;
        text-decoration: none;
      }
      div {
        display: flex;
        align-items: center;
        h3 {
          color: var(--green01, var(--green_01, #00f16f));
          font-family: Pretendard;
          font-size: 12px;
          margin: 0 10px 0 0;
        }
        h4 {
          color: var(--gray05, #8e8e8e);
          font-family: Pretendard;
          font-size: 12px;
          margin: 0;
        }
      }
    }
  }
`;

const Title = styled.h1`
  color: black;
  font-size: 24px;
  font-family: "Pretendard";
  font-weight: 700;
  margin: 0;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 25px;
  margin-top: 30px;
  input {
    width: 338px;
    padding: 13px 17px;
    border-radius: 30px;
    border: 1px solid var(--gray02, #f2f2f2);
    background: var(--gray03, #f7f7f7);
    font-family: "Pretendard";
    font-size: 15px;
    &::placeholder {
      color: var(--gray01, #bbb);
    }
  }
  img {
    margin-left: -45px;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
`;

const Filter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 23px;
`;

const FilterButton = styled.button`
  background: ${({ active }) =>
    active ? "#00F16F" : "var(--gray03, #f7f7f7)"};
  border: 1px solid var(--gray02, #f2f2f2);
  border-radius: 30px;
  padding: 10px 20px;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 600;
  color: ${({ active }) => (active ? "#FFFFFF" : "var(--gray01, #bbb)")};
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background: #00f16f;
    color: #ffffff;
  }
`;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  margin: 0;
`;
