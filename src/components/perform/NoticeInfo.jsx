import React, { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../../api/axios"; 

export default function NoticeInfo({ boothId }) {
  const [noticeInfo, setNoticeInfo] = useState(null);
  const [error, setError] = useState(null);

  const fetchNoticeInfo = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await instance.get(
        `${process.env.REACT_APP_SERVER_PORT}/manages/${boothId}/realtime_info/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNoticeInfo(response.data.notice); // 공지사항 정보 저장
    } catch (error) {
      setError("공지사항을 불러오는데 실패했습니다.");
      console.error(error);
    }
  };

  // 컴포넌트가 마운트될 때 공지사항 정보 가져오기
  useEffect(() => {
    if (boothId) {
      fetchNoticeInfo();
    }
  }, [boothId]);

  // 오류가 발생한 경우 메시지 표시
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Wrap>
      {noticeInfo ? (
        noticeInfo.map((notice, index) => (
          <div className="box" key={index}>
            <span className="noti_type">{notice.notice_type}</span>
            <p className="scrip">{notice.content}</p>
            <span className="time">{new Date(notice.created_at).toLocaleTimeString()}</span>
          </div>
        ))
      ) : (
        <p>공지사항을 불러오는 중입니다...</p>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  * {
    padding: 0;
    margin: 0;
  }
  width: 350px;
  .box {
    display: flex;
    padding-inline: 14px;
    padding-block: 16px;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 15px;
    border: 1px solid #07fb77;
    background: var(--wh, #fff);
  }
  .noti_type {
    display: flex;
    width: 56px;
    padding: 2.692px 7px;
    justify-content: center;
    align-items: center;
    gap: 7.179px;
    border-radius: 5.385px;
    background: #07fb77;
    color: var(--wh01, var(--wh, #fff));
    font-size: 11px;
    font-weight: 700;
    line-height: 18px;
  }
  .scrip {
    color: #000;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: -0.5px;
    margin-top: 6px;
  }
  .time {
    color: var(--gray05, #8e8e8e);
    text-align: right;
    font-size: 10px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: -0.407px;
    align-self: stretch;
  }
`;
