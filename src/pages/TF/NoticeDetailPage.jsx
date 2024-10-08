import React, { useState, useEffect } from "react";
import styled from "styled-components";
import background from "../../images/background.png";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NoticeDetailPage({ match }) {
  const { id } = match.params;
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    fetch(`/api/notices/${id}`)
      .then((response) => response.json())
      .then((data) => setNotice(data));
  }, [id]);

  const deleteNotice = () => {
    fetch(`/api/notices/${id}`, { method: "DELETE" }).then(() => {
      // 공지 삭제 후, 리스트 페이지로 이동
      window.location.href = "/NoticeList";
    });
  };

  return (
    <Wrapper>
      <Header style={{ color: "#3cb44b" }} />
      notice && (
      <div>
        <h1>{notice.title}</h1>
        <p>{notice.content}</p>
        <div>
          <button onClick={deleteNotice}>삭제</button>
          <a href={`/notices/edit/${id}`}>수정</a>
        </div>
      </div>
      )
    </Wrapper>
  );
}

export default NoticeDetailPage;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  background-image: url(${background});
  margin: 0;
`;
