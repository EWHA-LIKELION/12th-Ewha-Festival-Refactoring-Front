import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../api/axios";
import styled from "styled-components";
import BackArrow from "../../images/BoothDetail/arrow-left.svg";
import logo from "../../images/BoothEdit/logo.svg";
import 임시부스이미지 from "../../images/BoothDetail/임시부스이미지.svg";
import addnoticebutton from "../../images/BoothEdit/addnoticebutton.svg";
import addMenu from "../../images/BoothEdit/addMenu.svg";
import BoothTimeSetting from "./BoothTimeSetting";
import MenuImage from "../../components/MenuImage";

const BoothEditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [fetchedBoothId, setFetchedBoothId] = useState(null);

  const [boothImage, setBoothImage] = useState(임시부스이미지);
  const [boothName, setBoothName] = useState("");
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [newNoticeContent, setNewNoticeContent] = useState("");
  const [notices, setNotices] = useState([]);
  const [isNoticeBoxVisible, setIsNoticeBoxVisible] = useState(false);
  const [menuDetails, setMenuDetails] = useState({});
  const [selectedManage, setSelectedManage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBoothData = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken");

        // /manages/main/에서 booth_id 가져오기
        const boothIdResponse = await instance.get("/manages/main/", {
          headers: {
            Authorization: `Bearer${accessToken}`,
          },
        });

        const fetchedBoothId = boothIdResponse.data.booth_id;
        setFetchedBoothId(fetchedBoothId);

        // 부스 정보 가져오기
        const response = await instance.get(`/booths/${fetchedBoothId}/`);
        setBoothName(response.data.data.name);

        // 부스 실시간 공지사항 가져오기
        const noticesResponse = await instance.get(
          `/manages/${fetchedBoothId}/realtime_info/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const noticeData = noticesResponse.data.notice;
        const noticesArray = Object.keys(noticeData).map((key) => ({
          id: key, // notice의 ID를 키로 사용
          type: noticeData[key].notice_type,
          content: noticeData[key].content,
          createdAt: noticeData[key].created_at,
        }));

        setNotices(noticesArray);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            setErrorMessage("인증 정보가 제공되지 않았습니다.");
          } else if (error.response.status === 404) {
            setErrorMessage("사용자의 부스가 없습니다.");
          } else if (error.response.status === 403) {
            setErrorMessage("권한이 없습니다.");
          } else {
            setErrorMessage("부스 정보를 가져오는 중 오류가 발생했습니다.");
          }
        } else {
          console.error("Error fetching booth data:", error);
          setErrorMessage("부스 정보를 가져오는 중 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBoothData();
  }, []);

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

  const createNotice = async (noticeType, content) => {
    try {
      const response = await instance.post(
        `manages/${fetchedBoothId}/realtime_info/`,
        {
          notice_type: noticeType,
          content: content,
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("공지 추가 중 오류가 발생했습니다.");
      }
    }
  };

  const handleNoticeSubmit = async (event) => {
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

      await createNotice(
        selectedNotice === "판매" ? "행사공지" : "운영공지",
        newNoticeContent
      );
    }
  };

  const toggleNoticeBox = () => {
    setIsNoticeBoxVisible(!isNoticeBoxVisible);
  };

  const goToAddMenuPage = () => {
    navigate("/booth-edit-addmenu", { state: { id: fetchedBoothId } });
  };

  const handleManageSelect = (manages) => {
    setSelectedManage(manages);
  };

  const handleUpdateBooth = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const userType = localStorage.getItem("type");

    if (userType !== "tf") {
      alert("권한이 없습니다.");
      return;
    }

    try {
      setLoading(true);
      const response = await instance.patch(
        `/manages/${fetchedBoothId}/`,
        {
          name: boothName,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
        navigate(`/booth-detail/${fetchedBoothId}`, {
          state: { id: fetchedBoothId },
        });
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.detail || error.response.data.message);
      } else {
        alert("부스 수정 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNoticeDelete = async (infoId) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await instance.delete(
        `/manages/${fetchedBoothId}/realtime_info/${infoId}/`, // 공지사항 삭제 요청
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
        // 공지사항 삭제 후 상태 업데이트
        setNotices(notices.filter((notice) => notice.id !== infoId)); // infoId로 공지 삭제
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("공지 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Wrapper>
      <Header>
        <img src={BackArrow} alt="뒤로가기" onClick={() => navigate(-1)} />
        <img src={logo} alt="로고" />
      </Header>
      <BoothImageWrapper>
        <TitleFontStyle>대표사진</TitleFontStyle>
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
        <TitleFontStyle>부스 이름</TitleFontStyle>
        <input
          type="text"
          value={boothName}
          onChange={handleBoothNameChange}
          placeholder="부스 이름을 입력하세요"
        />
      </BoothNameWrapper>
      <NoticeWrapper>
        <div className="noticetitle">
          <TitleFontStyle>실시간 공지사항</TitleFontStyle>
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
                  onClick={() => handleNoticeDelete(notice.id)} // notice.id를 사용하여 삭제
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
        <TitleFontStyle>부스 운영시간</TitleFontStyle>
        <BoothTimeSetting />
      </BoothTime>
      <BoothIntroduce>
        <TitleFontStyle>부스 소개글</TitleFontStyle>
        <textarea placeholder="부스에 대해 알리는 소개글을 작성해주세요(최대 100자)"></textarea>
      </BoothIntroduce>
      <MenuWrapper>
        <TitleFontStyle>메뉴</TitleFontStyle>
        <MenuBox>
          <MenuImage menu={menuDetails} />
          <img src={addMenu} alt="부스이미지" onClick={goToAddMenuPage} />
        </MenuBox>
      </MenuWrapper>
      <BoothContact>
        <TitleFontStyle>부스 운영진 연락처</TitleFontStyle>
        <textarea
          placeholder="문의를 위한 부스 운영진 연락처를 남겨주세요
예) 카카오톡 오픈채팅 링크"
        ></textarea>
      </BoothContact>
      <TitleFontStyle>판매 여부</TitleFontStyle>
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
      <SubmitButton onClick={handleUpdateBooth} disabled={loading}>
        {loading ? "업데이트 중..." : "작성 완료"}
      </SubmitButton>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}{" "}
      {/* 에러 메시지 표시 */}
    </Wrapper>
  );
};

export default BoothEditPage;

// 스타일 컴포넌트 코드
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

const TitleFontStyle = styled.div`
  color: #000;
  font-size: 15px;
  font-weight: 700;
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
    font-size: 10.769px;
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
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  &:disabled {
    background: #b2e0b2; /* 비활성화 상태 스타일 */
    cursor: not-allowed; /* 비활성화 상태 커서 */
  }
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
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 14px;
`;
