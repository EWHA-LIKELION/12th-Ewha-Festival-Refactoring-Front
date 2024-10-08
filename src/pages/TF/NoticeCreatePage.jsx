import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import instance from "../../api/axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";

function NoticeCreatePage({ notice }) {
  const navigate = useNavigate();
  const location = useLocation();
  const noticeToEdit = location.state?.noticeToEdit || null;

  const [isEdit, setIsEdit] = useState(false);
  const { pk } = useParams();

  // 기존 데이터 또는 기본값으로 초기 상태 설정
  const [type, setType] = useState("operation");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [event, setEvent] = useState("ewhagreenFe");
  const [isImportant, setIsImportant] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  // console.log("Notice object:", notice); // notice 값 확인
  // 공지 수정 모드일 경우 초기값 설정
  useEffect(() => {
    if (noticeToEdit) {
      setIsEdit(true);
      setTitle(noticeToEdit.title);
      setContent(noticeToEdit.content);
      setType(noticeToEdit.notice_type === "event" ? "event" : "operation");
      setEvent(noticeToEdit.event_type || "ewhagreenFe");
      setIsImportant(noticeToEdit.is_important);
    }
  }, [noticeToEdit]);

  const eventOptions = [
    { value: "ewhagreenFe", label: "다시 돌아온 네가 그린 그린은 이화그린" },
    { value: "artistShow", label: "아티스트 공연" },
    { value: "movie_fe", label: "야간 영화제" },
    { value: "nightMarket", label: "야시장" },
    { value: "tugOfWar", label: "영산 줄다리기" },
    { value: "riceFe", label: "이화인 한솥밥 배부" },
  ];

  const openModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmAction = () => {
    if (modalTitle === (isEdit ? "공지 수정 완료" : "공지 작성 완료")) {
      handleSubmit();
    } else {
      navigate("/notice-list"); // 작성 취소 시 리스트로 돌아가기
    }
    closeModal();
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("No access token found");
      return;
    }

    const data = {
      title,
      content,
      notice_type: type === "event" ? "event" : "operational",
      event_type: type === "event" ? event : null,
      is_important: isImportant,
    };

    const data_edit = {
      title,
      content,
    };

    try {
      if (isEdit) {
        // 수정 요청
        await instance.patch(
          `${process.env.REACT_APP_SERVER_PORT}/notice/list/${noticeToEdit.id}/`,
          data_edit,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // 작성 요청
        await instance.post(
          `${process.env.REACT_APP_SERVER_PORT}/notice/create/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      navigate("/notice-list");
    } catch (error) {
      console.error("Error submitting notice:", error);
    }
  };

  return (
    <Wrapper>
      <Header />
      <Container>
        <Title>{isEdit ? "공지 수정하기" : "공지 작성하기"}</Title>
        <NoticeType>
          <TypeButton
            active={type === "operation"}
            onClick={() => setType("operation")}
          >
            운영 공지
          </TypeButton>
          <TypeButton
            active={type === "event"}
            onClick={() => setType("event")}
          >
            행사 공지
          </TypeButton>
        </NoticeType>

        {type === "event" && (
          <select value={event} onChange={(e) => setEvent(e.target.value)}>
            {eventOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        <input
          type="text"
          maxLength="40"
          placeholder="제목을 작성하세요(최대 40자)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          maxLength="800"
          placeholder="내용을 작성하세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Container>

      <BottomContainer>
        <Select>
          <label>
            <input
              type="checkbox"
              checked={isImportant}
              onChange={() => setIsImportant(!isImportant)}
            />
            중요 공지로 설정
          </label>
        </Select>
        <ButtonContainer>
          <button
            onClick={() =>
              openModal(
                isEdit ? "공지 수정 취소" : "공지 작성 취소",
                <>
                  {isEdit
                    ? "공지 수정을 취소하시겠습니까?"
                    : "공지 작성을 취소하시겠습니까?"}
                  <p>작성된 내용은 저장되지 않습니다.</p>
                </>
              )
            }
          >
            취소
          </button>
          <button
            onClick={() =>
              openModal(
                isEdit ? "공지 수정 완료" : "공지 작성 완료",
                isEdit
                  ? "공지 수정을 완료하시겠습니까?"
                  : "공지 작성을 완료하시겠습니까?"
              )
            }
          >
            완료
          </button>
        </ButtonContainer>
      </BottomContainer>

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
                onClick={confirmAction}
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
}

export default NoticeCreatePage;

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

const BottomContainer = styled.div`
  margin: 30px 0 0 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 200px;
`;

const Select = styled.div`
  display: flex;
  align-items: center;

  label {
    color: var(--gray01, #bbb);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
    letter-spacing: -0.5px;
    display: flex;
    align-items: center;

    input {
      appearance: none; /* 기본 체크박스 스타일 제거 */
      width: 16px;
      height: 16px;
      border-radius: 2px;
      background: #d9d9d9;
      margin-right: 8px;
      border: 1px solid #d9d9d9;
      cursor: pointer;

      &:checked {
        background: var(--green_01, #00f16f);
        border: 1px solid var(--green_01, #00f16f);
      }
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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

const NoticeType = styled.div`
  margin: 37px 0 20px 0;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const TypeButton = styled.button`
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
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  select {
    /* -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none; */
    border-radius: 30px;
    border: 1px solid var(--gray02, #f2f2f2);
    background: var(--gray03, #f7f7f7);
    width: 343px;
    padding: 9px 17px;
    margin-bottom: 30px;
  }
  select:hover {
    border-color: #bbbbbb;
  }
  select:focus {
    border-color: #bbbbbb;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
  }
  option {
    margin-top: 3px;
    border-radius: 14px;
    border: 1px solid var(--gray02, #f2f2f2);
    background: var(--gray03, #f2f2f2);
    width: 343px;
    padding: 16px 12px;
    gap: 16px;
  }
  input {
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

    &:focus {
      border-bottom: 2px solid #00f16f; // 포커스 시에도 하단 테두리 유지
    }
  }
  input::placeholder {
    color: var(--gray01, #bbb);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
    letter-spacing: -0.5px;
  }
  textarea {
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

    &:focus {
      border-bottom: 2px solid #00f16f; // 포커스 시에도 하단 테두리 유지
    }
  }
  textarea::placeholder {
    color: var(--gray01, #bbb);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
    letter-spacing: -0.5px;
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

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  margin: 0;
`;
