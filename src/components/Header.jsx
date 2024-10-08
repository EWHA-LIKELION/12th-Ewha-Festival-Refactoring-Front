import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
<<<<<<< HEAD
=======
import { useNavigate, useLocation } from "react-router-dom";
>>>>>>> master
import greenlogo from "../images/greenlogo.svg";
import grayhamburger from "../images/grayhamburger.svg";
import closeIcon from "../images/closeIcon.svg"; // X 버튼 이미지 추가
import searchIcon from "../images/search.svg";
<<<<<<< HEAD
const Header = () => {
=======
import instance from "../api/axios";

const MainHeader = () => {
>>>>>>> master
  const [isModalOpen, setModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

<<<<<<< HEAD
=======
  const location = useLocation(); // 현재 페이지의 경로를 가져옴
  const navigate = useNavigate();

>>>>>>> master
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

<<<<<<< HEAD
  const handleSearch = () => {
    console.log("검색어:", searchTerm);
    // 추후 백엔드 연결 시 검색어를 서버로 보내는 작업 구현 예정
=======
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

      // 검색 결과를 받아와서 다른 페이지로 navigate
      navigate("/search", {
        state: { booths: response.data.booths, searchTerm },
      });
    } catch (error) {
      console.error("검색 오류:", error);
      navigate("/search", { state: { booths: [] } }); // 검색 결과가 없을 경우 빈 배열 전달
    }
  };

  const goToPage = (url) => {
    if (location.pathname === url) {
      closeModal(); // 현재 페이지를 클릭했을 때 모달 닫기
    } else {
      navigate(url);
    }
>>>>>>> master
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
<<<<<<< HEAD
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
=======
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
            </ModalHeader>
            <MenuList>
              <li onClick={() => goToPage("/booth")}>부스 목록</li>
              <li onClick={() => goToPage("/show")}>공연 목록</li>
              <li onClick={() => goToPage("/notice-list")}>축준위 공지</li>
              <li onClick={() => goToPage("/festival-schedule")}>
                축제 일정 및 상설 부스
              </li>
              <li onClick={() => goToPage("/trash")}>쓰레기통 및 그릇 반납</li>
              <li onClick={() => goToPage("/barrier-free")}>배리어프리</li>
              <li onClick={() => goToPage("/mypage")}>마이페이지</li>
            </MenuList>
          </Modal>
        )}
        <img
          src={greenlogo}
          onClick={() => navigate("/")}
          alt="logo"
          width="80px"
          height="20px"
        />
      </Container>
>>>>>>> master
    </>
  );
};

<<<<<<< HEAD
export default Header;
=======
export default MainHeader;
>>>>>>> master

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
<<<<<<< HEAD
  display: flex;
  justify-content: space-between;
  padding: 40px 20px 26px;
=======
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 40px 20px 26px;

  img {
    cursor: pointer;
  }
>>>>>>> master
`;

const Hamburger = styled.img`
  width: 22px;
  height: 18px;
  cursor: pointer;
`;

const Modal = styled.div`
<<<<<<< HEAD
  position: fixed;
  top: 0;
  left: 0;
  max-width: 390px;
=======
  position: absolute;
  top: 0;
  left: 0;
  max-width: 390px;
  width: 100%;
>>>>>>> master
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  background-color: white;
  animation: ${({ isClosing }) => (isClosing ? "slideOut" : "slideIn")} 0.3s
    ease-in-out forwards;
<<<<<<< HEAD

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
=======
  clip-path: ${({ isClosing }) =>
    isClosing ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 0%)"};
  z-index: 10; /* Add a higher z-index to the sidebar */

  @keyframes slideIn {
    from {
      clip-path: inset(0% 100% 0% 0%);
    }
    to {
      clip-path: inset(0% 0% 0% 0%);
>>>>>>> master
    }
  }

  @keyframes slideOut {
    from {
<<<<<<< HEAD
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
=======
      clip-path: inset(0% 0% 0% 0%);
    }
    to {
      clip-path: inset(0% 100% 0% 0%);
>>>>>>> master
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
<<<<<<< HEAD
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const CloseButton = styled.img`
  width: 24px;
  height: 24px;
=======
  flex-direction: column;
  align-items: flex-start;
  padding-left: 19px;
  padding-top: 25px;
  padding-right: 25px;
`;

const CloseButton = styled.img`
  display: flex;
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
>>>>>>> master
  cursor: pointer;
`;

const SearchBar = styled.div`
  display: flex;
  width: 100%;
<<<<<<< HEAD
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 8px;
  font-size: 16px;
=======
  margin-left: 1px;
  margin-right: 1px;
  margin-top: 29px;
  padding-bottom: 5px;
  flex-direction: row;
  justify-content: space-between;
`;

const SearchInput = styled.input`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 133.333% */
  letter-spacing: -0.5px;
  border: none;
  padding-left: 5px;
>>>>>>> master

  &:focus {
    outline: none;
  }
<<<<<<< HEAD
=======

  &::placeholder {
    color: #c1d9cc;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 133.333% */
    letter-spacing: -0.5px;
  }
>>>>>>> master
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
<<<<<<< HEAD
  padding: 8px;
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 20px;

  li {
    padding: 10px 0;
=======
`;

const MenuList = styled.ul`
  margin: 0px;
  padding-left: 21px;
  margin-top: 32px;
  list-style-type: none;

  li {
    margin-bottom: 21px;
    color: var(--bk01, #000);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 100% */
    letter-spacing: -0.5px;
>>>>>>> master
    cursor: pointer;
  }
`;
