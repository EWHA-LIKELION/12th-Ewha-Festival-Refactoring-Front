import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../api/axios";
import Footer from "../../components/Footer";

const NoticeDetailPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [noticeData, setNoticeData] = useState(null); // 공지사항 상태 추가
  const { pk } = useParams(); // URL에서 pk 값을 가져옴

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/notice-create", { state: { noticeToEdit: noticeData } });
  };

  const openModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteNotice = () => {
    const accessToken = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기
    instance
      .delete(`${process.env.REACT_APP_SERVER_PORT}/notice/list/${pk}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization 헤더 설정
        },
      })
      .then(() => {
        // 공지 삭제 후, 리스트 페이지로 이동
        navigate("/notice-list");
        closeModal();
      })
      .catch((error) => {
        console.error("공지사항 삭제 중 오류가 발생했습니다:", error);
      });
  };

  // 공지사항 상세 정보 가져오기
  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        const response = await instance.get(
          `${process.env.REACT_APP_SERVER_PORT}/notice/list/${pk}/`
        );
        setNoticeData(response.data); // 공지사항 데이터를 상태에 저장
      } catch (error) {
        console.error("공지사항을 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchNoticeDetail();
  }, [pk]);

  return (
    <Wrapper>
      <Header />
      <Container>
        <Title>공지사항</Title>
        {noticeData ? (
          <div>
            <h3>
              {noticeData.title} {noticeData.category}
              <div>
                {noticeData.notice_type === "event"
                  ? "행사 공지"
                  : noticeData.notice_type === "operational"
                  ? "운영 공지"
                  : noticeData.notice_type}
              </div>
            </h3>
            <p>{noticeData.content}</p>
          </div>
        ) : (
          <p>로딩 중...</p>
        )}
      </Container>
      <ButtonContainer>
        <button
          onClick={() =>
            openModal(
              "공지 삭제",
              <>
                해당 공지사항을 삭제하시겠습니까?
                <p>삭제된 글은 다시 불러올 수 없습니다.</p>
              </>
            )
          }
        >
          삭제
        </button>
        <button onClick={handleEdit}>수정</button>
      </ButtonContainer>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h1>{modalTitle}</h1>
            <div>{modalMessage}</div>
            <ModalButtons>
              <button
                onClick={closeModal}
                style={{ background: "#F7F7F7", color: "#BBBBBB" }}
              >
                아니오
              </button>
              <button
                onClick={deleteNotice}
                style={{ background: "#00F16F", color: "white" }}
              >
                예
              </button>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
      <Footer />
    </Wrapper>
  );
};

export default NoticeDetailPage;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  margin: 0;
`;

const Title = styled.h1`
  color: var(--bk01, #000);
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px; /* 108.333% */
  letter-spacing: -0.5px;
  border-top: none;
  border-bottom: none;
  margin: 0 0 15px 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 20px 0 20px;
  h3 {
    color: var(--bk01, #000);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
    letter-spacing: -0.5px;
    max-height: 44px;
    flex: 1 0 0;
    width: 341px;
    white-space: normal;
    background: transparent; // 배경을 투명하게 설정
    border: none; // 전체 테두리 제거
    border-top: 2px solid #00f16f; // 상단 테두리 없음
    border-bottom: 2px solid #00f16f; // 하단에만 테두리 설정 (#00F16F 색상)
    padding: 10px;
    outline: none; // 포커스 시 기본 테두리 제거
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      color: var(--gray01, #bbb);
      text-align: center;
      font-family: Pretendard;
      font-size: 10px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px; /* 200% */
      letter-spacing: -0.5px;
      border-radius: 30px;
      border: 1px solid var(--gray02, #f2f2f2);
      background: var(--gray03, #f7f7f7);
      width: 52px;
      height: 20px;
    }
  }
  p {
    color: var(--2022-re-wha-black, #0e0e0e);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
    width: 341px;
    min-height: 200px;

    background: transparent; // 배경을 투명하게 설정
    border: none; // 전체 테두리 제거
    border-top: none; // 상단 테두리 없음
    border-bottom: 2px solid #00f16f; // 하단에만 테두리 설정 (#00F16F 색상)
    padding: 10px;
    outline: none; // 포커스 시 기본 테두리 제거
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-right: 19px;
  margin-bottom: 270px;

  button {
    padding: 7px 17px;
    border-radius: 30px;
    border: 1px solid var(--gray02, #f2f2f2);
    background: ${({ active }) =>
      active ? "#00F16F" : "var(--gray03, #f7f7f7)"};
    color: ${({ active }) => (active ? "#FFFFFF" : "var(--gray01, #bbb)")};
    font-family: Pretendard;
    font-size: 15px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: -0.5px;
    cursor: pointer;

    &:hover {
      background: #00f16f;
      color: #ffffff;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  text-align: center;
  width: 286px;
  height: 151px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  p {
    color: #928d8d;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  h1 {
    margin: 0;
    width: 286px;
    height: 52px;
    flex-shrink: 0;
    border-radius: 10px 10px 0px 0px;
    background: var(--green04, #1ef380);
    color: var(--wh01, var(--wh, #fff));
    text-align: center;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%; /* 18px */
    letter-spacing: -0.5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div {
    margin-top: 10px;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.5px;
    padding: 0 20px;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  gap: 9px;
  button {
    padding: 7px 17px;
    width: 87px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 700;
    line-height: 20px; /* 133.333% */
    letter-spacing: -0.5px;
    &:first-child {
      background: #f7f7f7;
      color: #bbb;
    }
    &:last-child {
      background: #00f16f;
      color: white;
    }
  }
`;
