import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// function NoticeDetailPage({ match }) {
//   const { id } = match.params;
//   const [notice, setNotice] = useState(null);

//   useEffect(() => {
//     fetch(`/api/notices/${id}`)
//       .then((response) => response.json())
//       .then((data) => setNotice(data));
//   }, [id]);

//   const deleteNotice = () => {
//     fetch(`/api/notices/${id}`, { method: "DELETE" }).then(() => {
//       // 공지 삭제 후, 리스트 페이지로 이동
//       window.location.href = "/NoticeList";
//     });
//   };

//   return (
//     <Wrapper>
//       <Header style={{ color: "#3cb44b" }} />
//       notice && (
//       <div>
//         <h1>{notice.title}</h1>
//         <p>{notice.content}</p>
//         <div>
//           <button onClick={deleteNotice}>삭제</button>
//           <a href={`/notices/edit/${id}`}>수정</a>
//         </div>
//       </div>
//       )
//     </Wrapper>
//   );
// }

function NoticeDetailPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const navigate = useNavigate();
  const navToCreate = () => {
    navigate("/NoticeCreate");
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
    fetch(`/api/notices/`, { method: "DELETE" }).then(() => {
      // 공지 삭제 후, 리스트 페이지로 이동
      window.location.href = "/NoticeList";
      closeModal();
    });
  };

  return (
    <Wrapper>
      <Header />
      <Container>
        <Title>공지사항</Title>
        <div>
          <h3>
            [공지] 공공지사항입니다
            <div>행사 공지</div>
          </h3>
          <p>
            국군은 국가의 안전보장과 국토방위의 신성한 의무를 수행함을 사명으로
            하며, 그 정치적 중립성은 준수된다. 공무원의 직무상 불법행위로 손해를
            받은 국민은 법률이 정하는 바에 의하여 국가 또는 공공단체에 정당한
            배상을 청구할 수 있다.
          </p>
        </div>
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
        <button onClick={navToCreate}>수정</button>
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
    </Wrapper>
  );
}

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
    line-height: normal;
    p {
      color: #928d8d;
      text-align: center;
      font-family: Pretendard;
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin: 6px 0 6px 0;
    }
  }
`;

const ModalButtons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  width: 183px;
  height: 30px;
  button {
    padding: 5px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid var(--gray02, #f2f2f2);
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 166.667% */
    letter-spacing: -0.5px;
  }
`;
