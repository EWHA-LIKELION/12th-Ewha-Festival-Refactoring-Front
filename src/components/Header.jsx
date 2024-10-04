import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import greenlogo from "../images/greenlogo.svg";
import grayhamburger from "../images/grayhamburger.svg";
import closeIcon from "../images/closeIcon.svg"; // X 버튼 이미지 추가
import searchIcon from "../images/search.svg";

const MainHeader = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = () => {
    setModalOpen(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModalOpen(false);
    }, 300); // 애니메이션 시간과 맞추기 위해 300ms 설정
  };

  const handleSearch = () => {
    console.log("검색어:", searchTerm);
    // 추후 백엔드 연결 시 검색어를 서버로 보내는 작업 구현 예정
  };

  return (
    <>
      <GlobalStyle /> {/* GlobalStyle 적용 */}
      <Container>
        <Hamburger
          src={grayhamburger}
          alt="hamburger menu"
          onClick={openModal}
        />
        <img src={greenlogo} alt="logo" width="80px" height="20px" />
      </Container>
      {isModalOpen && (
        <Modal isClosing={isClosing}>
          <ModalHeader>
            <CloseButton
              src={closeIcon}
              alt="close button"
              onClick={closeModal}
            />
            <SearchBar>
              <SearchInput
                type="text"
                placeholder="검색어를 입력해 주세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchButton onClick={handleSearch}>
                <img src={searchIcon} alt="search" />
              </SearchButton>
            </SearchBar>
          </ModalHeader>
          <MenuList>
            <li>부스 목록</li>
            <li>공연 목록</li>
            <li>축준위 공지</li>
            <li>축제 일정 및 상설 부스</li>
            <li>쓰레기통 및 그릇 반납</li>
            <li>배리어프리</li>
            <li>마이페이지</li>
          </MenuList>
        </Modal>
      )}
    </>
  );
};

export default MainHeader;

const GlobalStyle = createGlobalStyle`
  :root{
    --vh: 100%;
    margin: 0 auto;
    max-width: 390px;
    box-sizing: border-box;
    font-family: 'Pretendard';
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 40px 20px 26px;
`;

const Hamburger = styled.img`
  width: 22px;
  height: 18px;
  cursor: pointer;
`;

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  max-width: 390px;
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  background-color: white;
  animation: ${({ isClosing }) => (isClosing ? "slideOut" : "slideIn")} 0.3s
    ease-in-out forwards;
  clip-path: ${({ isClosing }) =>
    isClosing ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 0%)"};

  @keyframes slideIn {
    from {
      clip-path: inset(0% 100% 0% 0%);
    }
    to {
      clip-path: inset(0% 0% 0% 0%);
    }
  }

  @keyframes slideOut {
    from {
      clip-path: inset(0% 0% 0% 0%);
    }
    to {
      clip-path: inset(0% 100% 0% 0%);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const CloseButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 8px;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 20px;

  li {
    padding: 10px 0;
    cursor: pointer;
  }
`;
