import React, { useEffect, useState } from "react";
import styled from "styled-components";
import arrowUp from "../../images/arrow-up.svg";
import instance from "../../api/axios";

export default function GuestBook({ booth }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await instance.get(
          `${process.env.REACT_APP_SERVER_PORT}/shows/${booth.id}/guestbook`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetchData();
  }, [booth?.id]);

  const users = [
    { name: "", isAdmin: true },
    { name: "", isAdmin: false },
  ]; //백 연결할 때 데이터 확인하고 다시 수정하기
  return (
    <Wrap>
      {/* map으로 수정하기! */}
      <Comment user={users[0]} booth={booth} />
      <Comment user={users[1]} booth={booth} />
      <Comment user={users[1]} booth={booth} />
      <CommentInput user={users[0]} booth={booth} />
    </Wrap>
  );
}
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 10px;
`;

const CommentInput = ({ booth }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    console.log("submit", comment);
    setComment("");
    postComment();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼 제출 방지
      handleSubmit(e);
    }
  };

  const postComment = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await instance.post(
        `${process.env.REACT_APP_SERVER_PORT}/shows/${booth.id}/guestbook`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("댓글 작성 실패:", error);
    }
  };

  return (
    <InputContainer>
      <TextInput
        type="text"
        placeholder="방명록을 남겨주세요"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <SubmitButton onClick={handleSubmit} tabIndex={0}>
        <ArrowImage src={arrowUp} alt="Submit" />
      </SubmitButton>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  padding: 0px 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  border: 1px solid var(--gray02, #f2f2f2);
  background: #f7f7f7;
  box-shadow: 0px 0px 9px 0px rgba(255, 255, 255, 0.25) inset;
  height: 35px;
`;

const TextInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 16px;
  background-color: transparent;

  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.5px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #8e8e8e;
  }
`;

const SubmitButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  height: 24px;
  width: 24px;
`;

const ArrowImage = styled.img`
  width: 24px;
  height: 24px;
`;

const Comment = ({ user, booth }) => {
  const commentText = "멋지다";
  const timestamp = "작성시간 9월 10일 13:41 14분";

  const handleDelete = () => {
    console.log("delete");
    deleteComment();
  };

  const deleteComment = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await instance.delete(
        `${process.env.REACT_APP_SERVER_PORT}/shows/${booth.id}/guestbook`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  return (
    <CommentContainer user={user}>
      {" "}
      {/* user prop 전달 */}
      <div className="top">
        <span className="user">{user.name || "Anonymous"}</span>
        <button onClick={handleDelete} className="rm">
          삭제
        </button>
      </div>
      <p className="content">{commentText}</p>
      <span className="timestamp">{timestamp}</span>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  padding: 11px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 7px;
  border-radius: 15px;
  border: 1px solid var(--gray02, #f2f2f2);
  background: var(--wh, #fff);
  box-shadow: 0px 0px 9px 0px rgba(255, 255, 255, 0.25) inset;
  position: relative;
  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .content {
    width: 100%;
    color: var(--bk01, #000);
    font-size: 12px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: -0.5px;
    margin: 0;
  }

  .timestamp {
    width: 100%;
    color: var(--gray05, #8e8e8e);
    text-align: right;
    font-size: 10px;
    font-weight: 400;
    line-height: 20px; /* 200% */
    letter-spacing: -0.5px;
  }
  .user {
    color: ${(props) =>
      props.user.isAdmin
        ? "var(--purple, var(--purple, #9747FF))"
        : "var(--green_01, #00f16f)"};
    font-size: 12px;
    font-weight: 800;
    line-height: 20px;
    letter-spacing: -0.5px;
  }
  .rm {
    color: var(--gray05, #8e8e8e);
    text-align: right;
    font-size: 10px;
    font-weight: 400;
    line-height: 20px; /* 200% */
    letter-spacing: -0.5px;
    background-color: transparent;
    border: transparent;
    cursor: pointer;
  }
`;
