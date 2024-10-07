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
  const [activeFilter, setActiveFilter] = useState("all"); // 기본 필터는 'all'

  const navigate = useNavigate();

  const navigateToCreate = () => {
    navigate("/NoticeCreate");
  };

  useEffect(() => {
    // Axios를 사용해 API 호출
    axios
      .get("/api/notices")
      .then((response) => {
        setNotices(response.data);
        setFilteredNotices(response.data); // 기본적으로 모든 공지 표시
      })
      .catch((error) => console.error("Error fetching notices:", error));
  }, []);

  const filterNotices = (type) => {
    setActiveFilter(type); // 클릭한 버튼을 활성 상태로 설정
    if (type === "all") {
      setFilteredNotices(notices);
    } else {
      setFilteredNotices(notices.filter((notice) => notice.type === type));
    }
  };

  const searchNotices = (term) => {
    setFilteredNotices(notices.filter((notice) => notice.title.includes(term)));
  };

  return (
    <Wrapper>
      <Header style={{ color: "#3cb44b" }} />
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
            active={activeFilter === "all"} // 'all' 필터가 활성 상태인지 확인
          >
            전체 공지
          </FilterButton>
          <FilterButton
            onClick={() => filterNotices("operation")}
            active={activeFilter === "operation"} // 'operation' 필터가 활성 상태인지 확인
          >
            운영 공지
          </FilterButton>
          <FilterButton
            onClick={() => filterNotices("event")}
            active={activeFilter === "event"} // 'event' 필터가 활성 상태인지 확인
          >
            행사 공지
          </FilterButton>
        </Filter>
        <ul>
          {filteredNotices.map((notice) => (
            <li key={notice.id}>
              <a href={`/notices/${notice.id}`}>{notice.title}</a>
            </li>
          ))}
        </ul>
        <Ullist>
          <Ilbox>[공지] 테스트 공지사항입니다1</Ilbox>
          <Ilbox>[공지] 테스트 공지사항입니다2</Ilbox>
        </Ullist>
      </TopContainer>
      <Create onClick={navigateToCreate}>
        <img src={createicon} />
      </Create>
    </Wrapper>
  );
}

export default NoticeListPage;

// 임시 Ul, il 스타일 지정
const Ullist = styled.div``;

const Ilbox = styled.div`
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
`;

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
