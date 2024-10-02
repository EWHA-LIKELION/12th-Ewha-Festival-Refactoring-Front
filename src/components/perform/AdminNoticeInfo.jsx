import React from "react";
import styled from "styled-components";
import notification from "../../images/notification.svg";
function AdminNoticeInfo() {
  return (
    <Wrap>
      <div className="box">
        <span className="noti_type">
          <img src={notification} />
          실시간 공지사항
        </span>
        <p className="scrip">공연이 10분 지연될 예정입니다 ㅜㅜ</p>
        <span className="time">2시간전</span>
      </div>
    </Wrap>
  );
}

export default AdminNoticeInfo;

const Wrap = styled.div`
  * {
    padding: 0;
    margin: 0;
  }
  width: 350px;
  margin-top: 19px;

  .box {
    display: flex;
    padding: 11px 14px;
    padding-block: 16px;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 15px;
    border: 1px solid var(--gray02, #f2f2f2);
    background: var(--wh, #fff);
    box-shadow: 0px 0px 9px 0px rgba(255, 255, 255, 0.25) inset;
  }
  .noti_type {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 7.179px;
    border-radius: 5.385px;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 800;
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

  .title {
    font-weight: 700;
    color: #000;
    font-size: 16px;
    line-height: 60px;
    margin: 0;
    padding-top: 8px;
    width: fit-content;
  }
`;
