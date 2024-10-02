import React, { useState } from "react";
import styled from "styled-components";
import BackArrow from "../../images/BoothDetail/arrow-left.svg";
import logo from "../../images/BoothEdit/logo.svg";
import 임시부스이미지 from "../../images/BoothDetail/임시부스이미지.svg";
import addnoticebutton from "../../images/BoothEdit/addnoticebutton.svg";
import BoothTimeSetting from "./BoothTimeSetting";

const BoothDetailPage = () => {
  const [boothImage, setBoothImage] = useState(임시부스이미지);
  const [boothName, setBoothName] = useState("");
  const [isscraped, setisccraped] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [newNoticeContent, setNewNoticeContent] = useState("");
  const [notices, setNotices] = useState([]);
  const [isNoticeBoxVisible, setIsNoticeBoxVisible] = useState(false); // 상태 추가

  const clickScrap = () => {
    setisccraped(!isscraped);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBoothImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBoothNameChange = (event) => {
    setBoothName(event.target.value);
  };

  const handleNoticeClick = (noticeType) => {
    setSelectedNotice(noticeType);
  };

  const handleNoticeInputChange = (event) => {
    setNewNoticeContent(event.target.value);
  };

  const handleNoticeSubmit = (event) => {
    if (event.key === "Enter" && newNoticeContent.trim() !== "") {
      event.preventDefault(); // 기본 엔터 동작 방지
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const notice = {
        content: newNoticeContent,
        category: selectedNotice,
        timestamp: timestamp,
        borderColor: selectedNotice === "판매" ? "#9747ff" : "#00F16F",
      };
      setNotices([...notices, notice]);
      setNewNoticeContent(""); // 공지 내용 초기화
      setIsNoticeBoxVisible(false); // 공지 추가 후 박스 숨기기
    }
  };

  const toggleNoticeBox = () => {
    setIsNoticeBoxVisible(!isNoticeBoxVisible); // 공지 추가 박스 보이기/숨기기
  };

  return (
    <Wrapper>
      <Header>
        <img src={BackArrow} alt="뒤로가기" />
        <img src={logo} alt="로고" />
      </Header>
      <BoothImageWrapper>
        <TitleFontSytle>대표사진</TitleFontSytle>
        <BoothImage>
          <img src={boothImage} alt="부스이미지" />
          <div
            className="changeImage"
            onClick={() => document.getElementById("fileInput").click()}
          >
            사진 교체하기
          </div>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </BoothImage>
      </BoothImageWrapper>
      <BoothNameWrapper>
        <TitleFontSytle>부스 이름</TitleFontSytle>
        <input
          type="text"
          value={boothName}
          onChange={handleBoothNameChange}
          placeholder="부스 이름을 입력하세요"
        />
      </BoothNameWrapper>
      <NoticeWrapper>
        <div className="noticetitle">
          <TitleFontSytle>실시간 공지사항</TitleFontSytle>
          <img
            src={addnoticebutton}
            alt="공지사항 추가"
            onClick={toggleNoticeBox} // 버튼 클릭 시 공지 박스 토글
            style={{ cursor: "pointer" }}
          />
        </div>
        {isNoticeBoxVisible && ( // NewNoticeBox 조건부 렌더링
          <NoticeBoxWrapper>
            <NewNoticeBox>
              <div className="noticetop">
                <div className="noticeCatagoryBox">
                  <div
                    className="noticeCatagory"
                    onClick={() => handleNoticeClick("판매")}
                    style={{
                      background:
                        selectedNotice === "판매" ? "#9747ff" : "#f0f0f0",
                      color: selectedNotice === "판매" ? "white" : "#5f5f5f",
                      border:
                        selectedNotice === "판매"
                          ? "none"
                          : "1px solid #c9c9c9",
                    }}
                  >
                    판매 공지
                  </div>
                  <div
                    className="noticeCatagory"
                    onClick={() => handleNoticeClick("운영")}
                    style={{
                      background:
                        selectedNotice === "운영" ? "#00F16F" : "#f0f0f0",
                      color: selectedNotice === "운영" ? "white" : "#5f5f5f",
                      border:
                        selectedNotice === "운영"
                          ? "none"
                          : "1px solid #c9c9c9",
                    }}
                  >
                    운영 공지
                  </div>
                </div>
                <div className="delete" onClick={toggleNoticeBox}>
                  취소
                </div>{" "}
                {/* 추가된 취소 버튼 */}
              </div>
              <textarea
                value={newNoticeContent}
                onChange={handleNoticeInputChange}
                onKeyDown={handleNoticeSubmit}
                placeholder="공지 내용을 작성해 주세요."
              ></textarea>
            </NewNoticeBox>
          </NoticeBoxWrapper>
        )}
        <NoticeBoxWrapper>
          {notices.map((notice, index) => (
            <Notice
              key={index}
              style={{ border: `1px solid ${notice.borderColor}` }}
            >
              <div className="noticetop">
                <div
                  className="selectedcatagory"
                  style={{ backgroundColor: `${notice.borderColor}` }}
                >
                  {notice.category} 공지
                </div>
                <div
                  className="delete"
                  onClick={() =>
                    setNotices(notices.filter((_, i) => i !== index))
                  }
                >
                  삭제
                </div>
              </div>
              <div>{notice.content}</div>
              <div>{notice.timestamp}</div>
            </Notice>
          ))}
        </NoticeBoxWrapper>
      </NoticeWrapper>
      <BoothTime>
        <TitleFontSytle>부스 운영시간</TitleFontSytle>
        <BoothTimeSetting />
      </BoothTime>

      <BoothIntroduce>
        <TitleFontSytle>부스 소개글</TitleFontSytle>
        <textarea placeholder="부스에 대해 알리는 소개글을 작성해주세요(최대 100자)"></textarea>
      </BoothIntroduce>
    </Wrapper>
  );
};

export default BoothDetailPage;

// (스타일 정의는 동일하게 유지)

const Wrapper = styled.div`
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const Header = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const BoothImageWrapper = styled.div``;

const BoothImage = styled.div`
  border-radius: 15px;
  height: 197px;
  width: 350px;
  overflow: hidden;
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .changeImage {
    background: rgba(0, 0, 0, 0.34);
    width: 350px;
    height: 54px;
    z-index: 10;
    position: absolute;
    bottom: 0;
    text-align: center;
    line-height: 54px;
    color: white;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
  }
`;

const TitleFontSytle = styled.div`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  align-self: self-start;
  justify-self: flex-start;
`;

const BoothNameWrapper = styled.div`
  margin-top: 20px;
  input {
    width: 322px;
    padding: 11px 14px;
    border-radius: 15px;
    border: 1px solid #e7e7e7;
    background: linear-gradient(334deg, #fff 71.49%, #fff 169%);
    box-shadow: 0px 0px 9px 0px rgba(255, 255, 255, 0.25) inset;
  }
`;

const NewNoticeBox = styled.div`
  width: 322px;
  height: 77px;
  padding: 11px 14px;
  border-radius: 15px;
  border: 1px solid #e7e7e7;
  .noticetop {
    display: flex;
    justify-content: space-between;
  }
  .noticeCatagoryBox {
    display: flex;
  }
  .noticeCatagory {
    border-radius: 5.385px;
    border: 1px solid #c9c9c9;
    padding: 3.5px 7.179px;
    background: #f0f0f0;
    width: 40px;
    color: #5f5f5f;
    font-family: Pretendard;
    font-size: 10.769px;
    font-style: normal;
    font-weight: 700;
    cursor: pointer;
    margin-right: 7px;
  }
  .delete {
    color: #8e8e8e;
    font-size: 12px;
    font-weight: 500;
    text-decoration-line: underline;
    cursor: pointer;
  }
  textarea {
    border: none;
    width: 322px;
    resize: none;
  }
  textarea:focus {
    outline: none;
  }
`;

const NoticeWrapper = styled.div`
  width: 350px;
  img {
    cursor: pointer;
  }
  .noticetitle {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 10px;
  }
`;

const Notice = styled.div`
  width: 322px;
  height: 77px;
  padding: 11px 14px;
  border-radius: 15px;
  margin-top: 10px;
  .noticetop {
    display: flex;
    justify-content: space-between;
  }
  .delete {
    color: #8e8e8e;
    cursor: pointer;
    font-size: 12px;
    text-decoration: underline;
  }
  .selectedcatagory {
    border-radius: 5.385px;
    padding: 3.5px 7.179px;
    width: 40px;
    color: white;
    font-family: Pretendard;
    font-size: 10.769px;
    font-weight: 700;
  }
`;
const NoticeBoxWrapper = styled.div`
  width: 360px;
  max-height: 230px;
  overflow-y: scroll;
  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 3px; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #bbb; /* 스크롤 핸들의 색상 */
    border-radius: 10px; /* 스크롤 핸들의 모서리 둥글게 */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #8d8a8a; /* 스크롤 핸들이 호버될 때 색상 */
  }
`;
const BoothTime = styled.div`
  width: 350px;
`;

const BoothIntroduce = styled.div``;
