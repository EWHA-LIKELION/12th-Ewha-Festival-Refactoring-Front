import React, { useEffect, useState } from "react";
import DeleteModal from './DeleteModal'; // DeleteModal 컴포넌트 임포트

export default function NoticeForm(props) {
  const { type, content, booth, createdAt, onDelete, onChange } = props;

  const [noticeType, setNoticeType] = useState('');
  const [timeAgo, setTimeAgo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const handleOnDelete = () => {
    setIsModalOpen(true); // 삭제 버튼 클릭 시 모달을 열기
  };

  const confirmDelete = () => {
    onDelete(booth); // 공지사항 삭제
    setIsModalOpen(false); // 모달 닫기
  };

  const handleOnChange = (booth, value) => onChange(booth, value);

  useEffect(() => {
    setNoticeType(type);
  }, [type]);

  useEffect(() => {
    if (createdAt) {
      const createdAtDate = new Date(createdAt);
      const now = new Date();
      const diffInMs = now - createdAtDate;
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setTimeAgo(`${diffInDays}일 ${diffInHours}시간 전`);
    }
  }, [createdAt]);

  return (
    <div style={{ position: "relative" }}>
      <textarea
        rows={3}
        className="input"
        placeholder="공지 내용을 작성해주세요."
        value={content}
        onChange={(e) => {
          handleOnChange(booth, e.target.value);
        }}
        readOnly={createdAt}
        style={{
          paddingTop: "40px",
          paddingBottom: "28px",
          border: createdAt ? "1px solid #27EF6F" : "1px solid #E7E7E7",
          resize: "none",
        }}
      />
      <button
        onClick={() => {
          if (createdAt) return;
          setNoticeType(noticeType === "운영공지" ? "판매공지" : "운영공지");
        }}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          width: "56px",
          height: "24px",
          padding: "5px",
          color: "white",
          backgroundColor: "#27EF6F",
          border: "none",
          borderRadius: "5px",
          fontSize: "12px",
        }}
      >
        {noticeType}
      </button>
      <button
        onClick={handleOnDelete} // 삭제 버튼 클릭 시 모달 열기
        style={{
          position: "absolute",
          top: "10px",
          right: "8px",
          width: "40px",
          height: "24px",
          padding: "5px",
          color: "#8E8E8E",
          backgroundColor: "transparent",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "12px",
          textDecoration: "underline",
        }}
      >
        {createdAt ? "삭제" : "취소"}
      </button>
      {createdAt && (
        <span
          style={{
            position: "absolute",
            bottom: "13px",
            right: "13px",
            width: "auto",
            color: "#8E8E8E",
            fontSize: "9.76px",
            textAlign: "right",
          }}
        >
          {timeAgo}
        </span>
      )}

      {isModalOpen && (
        <DeleteModal 
          setModal={setIsModalOpen} 
          confirmDelete={confirmDelete} // 모달에서 "예"를 누르면 삭제 실행
        />
      )}
    </div>
  );
}
