import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import instance from "../../api/axios";
import styled from "styled-components";
import BackArrow from "../../images/BoothDetail/arrow-left.svg";
import logo from "../../images/BoothEdit/logo.svg";
import 임시부스이미지 from "../../images/BoothDetail/임시부스이미지.svg";
import addnoticebutton from "../../images/BoothEdit/addnoticebutton.svg";
import addMenu from "../../images/BoothEdit/addMenu.svg";
import BoothTimeSetting from "./BoothTimeSetting";
import MenuImage from "../../components/MenuImage";

const BoothDetailPage = () => {
  const [boothImage, setBoothImage] = useState(임시부스이미지);
  const [boothId, setBoothId] = useState(""); // 부스 ID 상태 추가
  const [boothName, setBoothName] = useState("");
  const [isscraped, setisccraped] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [newNoticeContent, setNewNoticeContent] = useState("");
  const [notices, setNotices] = useState([]);
  const [isNoticeBoxVisible, setIsNoticeBoxVisible] = useState(false);
  const [menuDetails, setMenuDetails] = useState({});
  const [selectedManage, setSelectedManage] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const savedMenuDetails = localStorage.getItem("menuDetails");
    if (savedMenuDetails) {
      setMenuDetails(JSON.parse(savedMenuDetails));
    }
  }, []);

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
      event.preventDefault();
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
      setNewNoticeContent("");
      setIsNoticeBoxVisible(false);
    }
  };

  const toggleNoticeBox = () => {
    setIsNoticeBoxVisible(!isNoticeBoxVisible);
  };

  const goToAddMenuPage = () => {
    navigate("/booth-edit-addmenu"); // addMenu 클릭 시 이동할 경로 설정
  };

  const handleManageSelect = (manages) => {
    setSelectedManage(manages);
  };

  // 부스 수정 요청 처리 함수 추가
  const handleUpdateBooth = async () => {
    try {
      const response = await instance.patch(
        `${process.env.REACT_APP_SERVER_PORT}/manages/${boothId}/`, // 부스 ID를 URL에 포함
        {
          name: boothName, // 수정할 부스 이름
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 액세스 토큰 포함
          },
        }
      );

      if (response.status === 200) {
        console.log("부스 수정 성공:", response.data.message);
        // 추가적인 성공 처리 로직 (예: 사용자에게 알림 표시 등)
      }
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 오류:", error.response.data);
      } else {
        console.error("서버에 연결할 수 없음:", error.message);
      }
    }
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
            onClick={toggleNoticeBox}
            style={{ cursor: "pointer" }}
          />
        </div>
        {isNoticeBoxVisible && (
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
                </div>
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
      <MenuWrapper>
        <TitleFontSytle>메뉴</TitleFontSytle>
        <MenuBox>
          <MenuImage menu={menuDetails} />
          <MenuImage menu={menuDetails} />
          <MenuImage menu={menuDetails} />
          <img src={addMenu} alt="부스이미지" onClick={goToAddMenuPage} />{" "}
          {/* 이미지 클릭 시 페이지 이동 */}
        </MenuBox>
      </MenuWrapper>
      <BoothContact>
        <TitleFontSytle>부스 운영진 연락처</TitleFontSytle>
        <textarea
          placeholder="문의를 위한 부스 운영진 연락처를 남겨주세요
예) 카카오톡 오픈채팅 링크"
        ></textarea>
      </BoothContact>
      <TitleFontSytle>판매 여부</TitleFontSytle>
      <ManageOptions>
        {["운영 중", "운영 종료"].map((manages) => (
          <Option
            key={manages}
            onClick={() => handleManageSelect(manages)}
            selected={selectedManage === manages}
          >
            {manages}
          </Option>
        ))}
      </ManageOptions>
      <SubmitButton onClick={handleUpdateBooth}>작성 완료</SubmitButton>{" "}
      {/* 부스 수정 버튼 */}
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
  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #bbb;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #8d8a8a;
  }
`;

const BoothTime = styled.div`
  width: 350px;
  height: 200px;
`;

const BoothIntroduce = styled.div`
  width: 350px;
  textarea {
    width: 327.914px;
    height: 82.754px;
    padding: 11.379px 14.482px;
    border-radius: 15.516px;
    border: 1.034px solid #e7e7e7;
    font-size: 12.413px;
    font-style: normal;
    font-weight: 500;
    resize: none;
  }
`;

const MenuWrapper = styled.div`
  width: 350px;
`;

const MenuBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  img {
    cursor: pointer;
  }
`;
const BoothContact = styled.div`
  width: 350px;
  textarea {
    width: 327.914px;
    height: 82.754px;
    padding: 11.379px 14.482px;
    border-radius: 15.516px;
    border: 1.034px solid #e7e7e7;
    font-size: 12.413px;
    font-style: normal;
    font-weight: 500;
    resize: none;
  }
`;
const SubmitButton = styled.button`
  padding: 10px 140px;
  border-radius: 10px;
  border: 1px solid #03d664;
  background: #07fb77;
  color: var(--wh, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;
const ManageOptions = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
`;
const Option = styled.div`
  border: 1px solid #f2f2f2;
  background: ${(props) =>
    props.selected ? "var(--green_01, #00F16F)" : "#f7f7f7"};
  border-radius: 30px;
  padding: 7px 17px;
  font-size: 15px;
  margin-right: 8px;
  color: ${(props) =>
    props.selected ? "var(--wh, #FFF)" : "var(--gray01, #bbb)"};
  font-family: Pretendard;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;
