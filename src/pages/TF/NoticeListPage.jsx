import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import instance from "../../api/axios";
import searchicon from "../../images/searchicon.svg";
import createicon from "../../images/createicon.svg";
import { useNavigate } from "react-router-dom";

function NoticeListPage() {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const navigate = useNavigate();

  const navigateToCreate = () => {
    navigate("/notice-create");
  };

  useEffect(() => {
    const fetchNotices = async (page, type) => {
      try {
        const url = type
          ? `${process.env.REACT_APP_SERVER_PORT}/notice/list/?type=${type}&page=${page}`
          : `${process.env.REACT_APP_SERVER_PORT}/notice/list/?page=${page}`;
        const response = await instance.get(url);
        setNotices(response.data.results);
        setFilteredNotices(response.data.results);
        setTotalCount(response.data.count);
        setNextPage(response.data.next);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices(currentPage, activeFilter === "all" ? null : activeFilter); // 필터에 따라 공지 사항 불러오기
  }, [currentPage, activeFilter]); // currentPage와 activeFilter가 변경될 때마다 호출

  const filterNotices = (type) => {
    setActiveFilter(type);
    if (type === "all") {
      setFilteredNotices(notices);
    } else {
      setFilteredNotices(notices.filter((notice) => notice.type === type));
    }
  };

  const searchNotices = (term) => {
    setFilteredNotices(notices.filter((notice) => notice.title.includes(term)));
  };

  const handleNextPage = () => {
    if (nextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
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
              setSearchTerm(e.target.value);
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
            const formattedDate = createdAtDate.toISOString().split("T")[0]; // 'YYYY-MM-DD' 형식으로 변환

            return (
              <li key={notice.id}>
                <a href={`/notice-detail/${notice.id}`}>{notice.title}</a>{" "}
                {/* notice.pk를 notice.id로 수정 */}
                <div>
                  <h3>(준)축제준비위원회 {notice.author}</h3>
                  <h4>{formattedDate}</h4>
                </div>
              </li>
            );
          })}
        </ul>

        {nextPage && <button onClick={handleNextPage}>다음 페이지</button>}
      </TopContainer>
      <Create onClick={navigateToCreate}>
        <img src={createicon} />
      </Create>
    </Wrapper>
  );
}

export default NoticeListPage;

const Create = styled.div`
  cursor: pointer;
  width: 62px;
  height: 62px;
  position: fixed;
  bottom: 70px;
  right: 28px;
  z-index: 100;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  ul {
    margin: 0;
    padding: 0;
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
        font-style: normal;
        font-weight: 600;
        line-height: 22px; /* 137.5% */
        letter-spacing: -0.5px;
        text-decoration-line: none;
      }
      div {
        display: flex;
        align-items: center;
        h3 {
          color: var(--green01, var(--green_01, #00f16f));
          font-family: Pretendard;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 12px; /* 100% */
          letter-spacing: -0.5px;
          margin: 0 10px 0 0;
        }
        h4 {
          color: var(--gray05, #8e8e8e);
          font-family: Pretendard;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px; /* 183.333% */
          letter-spacing: -0.5px;
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
  line-height: 26px;
  word-wrap: break-word;
  margin: 0;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 25px;
  input {
    width: 338px;
    padding: 13px 17px;
    justify-content: space-between;
    align-items: center;
    border-radius: 30px;
    border: 1px solid var(--gray02, #f2f2f2);
    background: var(--gray03, #f7f7f7);
    margin: 35px 0 21px 0;
  }
  img {
    margin: 10px 0 0 -40px;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
`;

const Filter = styled.div`
  margin: 0 0 23px 0;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const FilterButton = styled.button`
  width: 88px;
  height: 34px;
  padding: 7px 17px;
  gap: 10px;
  border-radius: 30px;
  border: 1px solid var(--gray02, #f2f2f2);
  background: ${({ active }) =>
    active ? "#00F16F" : "var(--gray03, #f7f7f7)"};
  color: ${({ active }) => (active ? "#FFFFFF" : "var(--gray01, #bbb)")};
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.5px;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background: #00f16f;
    color: #ffffff;
  }
`;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  margin: 0;
`;
