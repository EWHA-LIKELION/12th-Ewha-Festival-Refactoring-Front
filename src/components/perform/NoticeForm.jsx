import React, { useState } from "react";

export default function NoticeForm(props) {
  const { type, content, booth, createdAt, onDelete, onChange } = props;

  const [noticeType, setNoticeType] = useState(type);

  const handleOnDelete = () => onDelete(booth);
  const handleOnChange = (booth, value) => onChange(booth, value);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <textarea
        rows={3}
        className="input"
        placeholder="공지 내용을 작성해주세요."
        defaultValue={content}
        onChange={(e) => {
          handleOnChange(booth, e.target.value);
        }}
        style={{
          paddingTop: "40px",
          paddingBottom: "28px",
          border: createdAt ? "1px solid #27EF6F" : "1px solid #E7E7E7",
        }}
      />
      <button
        onClick={() =>
          setNoticeType(noticeType === "운영공지" ? "판매공지" : "운영공지")
        }
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
        onClick={handleOnDelete}
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
          onClick={handleOnDelete}
          style={{
            position: "absolute",
            bottom: "10px",
            right: "13px",
            width: "40px",
            height: "24px",
            color: "#8E8E8E",
            fontSize: "12px",
            textAlign: "right",
          }}
        >
          {createdAt}시간 전
        </span>
      )}
    </div>
  );
}
