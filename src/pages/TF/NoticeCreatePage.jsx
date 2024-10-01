import React, { useState, useEffect } from "react";
import styled from "styled-components";
import background from "../../images/background.png";
import Header from "../../components/Header";
import axios from "axios";

function NoticeCreatePage({ isEdit, existingData }) {
  const [type, setType] = useState(existingData?.type || "operation"); // 기본으로 '운영 공지'가 선택됨
  const [title, setTitle] = useState(existingData?.title || "");
  const [content, setContent] = useState(existingData?.content || "");
  const [event, setEvent] = useState(existingData?.event || "");

  const eventOptions = [
    "다시 돌아온 네가 그린 그린은 이화그린",
    "아티스트 공연",
    "야간 영화제",
    "야시장",
    "영산 줄다리기",
    "이화인 한솥밥 배부",
  ];

  const handleSubmit = () => {
    const data = {
      type,
      title,
      content,
      event: type === "event" ? event : null,
    };
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/api/notices/${existingData.id}` : "/api/notices";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      // 저장 후 리스트 페이지로 이동
      window.location.href = "/NoticeList";
    });
  };

  return (
    <Wrapper>
      <Header />
      <Container>
        <Title>공지 작성하기</Title>
        <NoticeType>
          <TypeButton
            active={type === "operation"} // '운영 공지'가 선택되었는지 확인
            onClick={() => setType("operation")}
          >
            운영 공지
          </TypeButton>
          <TypeButton
            active={type === "event"} // '행사 공지'가 선택되었는지 확인
            onClick={() => setType("event")}
          >
            행사 공지
          </TypeButton>
        </NoticeType>

        {type === "event" && (
          <select value={event} onChange={(e) => setEvent(e.target.value)}>
            {eventOptions.map((option) => (
              <option key={option} value={option}>
                {option}
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
          <div></div>
          <p>중요 공지로 설정</p>
        </Select>
        <ButtonContainer>
          <button>취소</button>
          <button onClick={handleSubmit}>{isEdit ? "수정하기" : "완료"}</button>
        </ButtonContainer>
      </BottomContainer>
    </Wrapper>
  );
}

export default NoticeCreatePage;

const BottomContainer = styled.div`
  margin: 30px 0 0 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Select = styled.div`
  display: flex;
  align-items: center;
  div {
    width: 16px;
    height: 16px;
    border-radius: 2px;
    background: ${({ active }) =>
      active ? "#00F16F" : "var(--gray03, #f7f7f7)"};
    cursor: pointer;

    &:hover {
      background: #00f16f;
    }
  }
  p {
    margin-left: 13px;
    color: var(--gray01, #bbb);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
    letter-spacing: -0.5px;
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
    border-top: none; // 상단 테두리 없음
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
  background-image: url(${background});
  margin: 0;
`;
