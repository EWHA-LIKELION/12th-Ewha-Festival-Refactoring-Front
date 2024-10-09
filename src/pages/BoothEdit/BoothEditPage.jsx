import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../api/axios";
import styled from "styled-components";
import BackArrow from "../../images/BoothDetail/arrow-left.svg";
import logo from "../../images/BoothEdit/logo.svg";
import 임시부스이미지 from "../../images/BoothDetail/임시부스이미지.svg";
import addnoticebutton from "../../images/BoothEdit/addnoticebutton.svg";
import addMenu from "../../images/BoothEdit/addMenu.svg";
import MenuImage from "../../components/MenuImage";

const BoothEditPage = () => {
  const navigate = useNavigate();

  // 부스 관련 상태 관리
  const [fetchedBoothId, setFetchedBoothId] = useState(null);
  const [boothImage, setBoothImage] = useState(임시부스이미지);
  const [boothName, setBoothName] = useState("");
  const [operatingHours, setOperatingHours] = useState("");
  const [boothDescription, setBoothDescription] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [boothData, setBoothData] = useState(null);

  // 메뉴 관련 상태
  const [menuDetails, setMenuDetails] = useState([]);

  // 공지사항 관련 상태
  const [notices, setNotices] = useState([]);
  const [isNoticeBoxVisible, setIsNoticeBoxVisible] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [newNoticeContent, setNewNoticeContent] = useState("");

  // 부스 시간 관리
  const [days, setDays] = useState([
    { date: "10일 수요일", startTime: "", endTime: "", checked: false },
    { date: "11일 목요일", startTime: "", endTime: "", checked: false },
    { date: "12일 금요일", startTime: "", endTime: "", checked: false },
  ]);

  useEffect(() => {
    const fetchBoothData = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken");

        // 부스 ID 가져오기
        const boothIdResponse = await instance.get(
          `${process.env.REACT_APP_SERVER_PORT}/manages/main/`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const fetchedBoothId = boothIdResponse.data.booth_id;
        setFetchedBoothId(fetchedBoothId);

        // 부스 정보 가져오기
        const response = await instance.get(
          `${process.env.REACT_APP_SERVER_PORT}/booths/${fetchedBoothId}/`
        );
        const fetchedBoothData = response.data.data;
        setBoothData(fetchedBoothData);
        setMenuDetails(fetchedBoothData.menus);

        // 가져온 부스 데이터로 상태 업데이트
        setBoothName(fetchedBoothData.name);
        setOperatingHours(fetchedBoothData.operatingHours || "");
        setBoothDescription(fetchedBoothData.description || "");
        setContact(fetchedBoothData.admin_contact || "");

        // 공지사항 가져오기
        const noticesResponse = await instance.get(
          `/manages/${fetchedBoothId}/realtime_info/`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const noticeData = noticesResponse.data.notice;
        const noticesArray = Object.keys(noticeData).map((key) => ({
          id: key,
          type: noticeData[key].notice_type,
          content: noticeData[key].content,
          createdAt: noticeData[key].created_at,
          borderColor:
            noticeData[key].notice_type === "판매공지" ? "#9747ff" : "#00F16F",
        }));

        setNotices(noticesArray);

        console.log("Fetched notices:", noticeData); // 여기서 공지사항 데이터 출력
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
          console.error("부스 데이터 가져오기 오류:", error);
          setErrorMessage("부스 정보를 가져오는 중 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBoothData();
  }, []);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setBoothImage(reader.result);

        // 이미지 업로드를 위한 FormData 생성
        const formData = new FormData();
        formData.append("thumbnail", file);

        try {
          const accessToken = localStorage.getItem("accessToken");
          const response = await instance.patch(
            `${process.env.REACT_APP_SERVER_PORT}/manages/${fetchedBoothId}/`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status === 200) {
            setBoothImage(response.data.data.thumbnail);
            alert("이미지가 성공적으로 업데이트되었습니다.");
          }
        } catch (error) {
          if (error.response) {
            alert(
              error.response.data.message ||
                "이미지 업데이트 중 오류가 발생했습니다."
            );
          } else {
            alert("이미지 업데이트 중 오류가 발생했습니다.");
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBoothNameChange = (event) => {
    setBoothName(event.target.value);
  };

  // 메뉴 추가 페이지로 이동하는 함수 정의
  const goToAddMenuPage = () => {
    navigate("/booth-edit/addmenu", { state: { id: fetchedBoothId } });
  };

  // 공지사항 관련 핸들러
  const handleNoticeClick = (noticeType) => {
    setSelectedNotice(noticeType);
  };

  const handleNoticeInputChange = (event) => {
    setNewNoticeContent(event.target.value);
  };

  const createNotice = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await instance.post(
        `${process.env.REACT_APP_SERVER_PORT}/manages/${fetchedBoothId}/realtime_info/`,
        {
          notice_type: selectedNotice === "판매" ? "판매공지" : "운영공지",
          content: newNoticeContent,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
        const notice = {
          id: response.data.id, // 서버에서 반환된 ID 사용
          content: newNoticeContent,
          category: selectedNotice,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          borderColor: selectedNotice === "판매" ? "#9747ff" : "#00F16F",
        };
        setNotices((prevNotices) => [...prevNotices, notice]);
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
      await createNotice();
      setNewNoticeContent("");
      setIsNoticeBoxVisible(false);
    }
  };

  const toggleNoticeBox = () => {
    setIsNoticeBoxVisible(!isNoticeBoxVisible);
  };

  const handleNoticeDelete = async (infoId) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const numericInfoId = parseInt(infoId, 10); // infoId를 숫자로 변환
      console.log(`Deleting notice with ID: ${numericInfoId + 1}`); // 변환된 값을 사용
      const response = await instance.delete(
        `${
          process.env.REACT_APP_SERVER_PORT
        }/manages/${fetchedBoothId}/realtime_info/${numericInfoId + 1}/`, // 변환된 값에 1을 더함
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
        setNotices((prevNotices) =>
          prevNotices.filter((notice) => notice.id !== infoId)
        );
      }
    } catch (error) {
      console.error("Error deleting notice:", error); // 추가된 로그
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("공지 삭제 중 오류가 발생했습니다.");
      }
    }
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
      const formattedDays = days
        .filter((day) => day.checked)
        .map((day) => `${day.date} ${day.startTime} ~ ${day.endTime}`)
        .filter((day) => day.includes("~"));

      const response = await instance.patch(
        `${process.env.REACT_APP_SERVER_PORT}/manages/${fetchedBoothId}/`,
        {
          name: boothName,
          operatingHours: operatingHours,
          description: boothDescription,
          admin_contact: contact,
          is_opened: true, // 기본값 설정
          days: formattedDays,
          thumbnail: boothImage,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
        navigate(`/booth-detail`, {
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
      {/* 공지사항 부분 추가 */}
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
          {notices.length > 0 ? (
            notices.map((notice) => (
              <Notice
                key={notice.id}
                style={{ border: `1px solid ${notice.borderColor}` }}
              >
                <div className="noticetop">
                  <div
                    className="selectedcatagory"
                    style={{ backgroundColor: `${notice.borderColor}` }}
                  >
                    {notice.type} 공지
                  </div>
                  <div
                    className="delete"
                    onClick={() => handleNoticeDelete(notice.id)}
                  >
                    삭제
                  </div>
                </div>
                <div>{notice.content}</div>
                <div>{new Date(notice.createdAt).toLocaleString()}</div>
              </Notice>
            ))
          ) : (
            <div>공지사항이 없습니다.</div>
          )}
        </NoticeBoxWrapper>
      </NoticeWrapper>
      <BoothIntroduce>
        <TitleFontStyle>부스 소개글</TitleFontStyle>
        <textarea
          value={boothDescription}
          onChange={(e) => setBoothDescription(e.target.value)}
          placeholder="부스 소개글을 입력하세요"
        ></textarea>
      </BoothIntroduce>

      <MenuWrapper>
        <TitleFontStyle>메뉴</TitleFontStyle>
        <MenuBox>
          {menuDetails.length > 0 ? (
            menuDetails.map((menu) => (
              <MenuImageWrapper key={menu.id}>
                <MenuImage
                  className="menuImage"
                  menu={menu}
                  style={{
                    width: "100%", // 부모 요소에 맞춰 크기 조정
                    height: "100%", // 부모 요소에 맞춰 크기 조정
                    flexShrink: 0, // Flexbox에서 크기 축소 방지
                  }}
                />
              </MenuImageWrapper>
            ))
          ) : (
            <div>메뉴 정보가 없습니다.</div>
          )}
          <img src={addMenu} alt="부스메뉴 추가" onClick={goToAddMenuPage} />
        </MenuBox>
      </MenuWrapper>

      <BoothContact>
        <TitleFontStyle>부스 운영진 연락처</TitleFontStyle>
        <textarea
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="운영진 연락처를 입력하세요"
        ></textarea>
      </BoothContact>

      <SubmitButton onClick={handleUpdateBooth} disabled={loading}>
        {loading ? "업데이트 중..." : "작성 완료"}
      </SubmitButton>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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

const NewNoticeBox = styled.div`
  width: 322px;
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

const Notice = styled.div`
  width: 322px;
  height: auto;
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
  grid-template-columns: repeat(2, 170px); // 2열로 고정
  grid-auto-rows: 197px; // 각 행의 높이를 고정
  place-items: center;

  img {
    cursor: pointer;
  }

  // 그리드 항목 스타일
  > div {
    width: 170px; // 고정된 너비
    height: 197px; // 고정된 높이
    display: flex; // 플렉스 박스를 사용하여 내부 요소를 정렬
    align-items: center; // 수직 중앙 정렬
    justify-content: center; // 수평 중앙 정렬
    overflow: hidden; // 내용이 넘칠 경우 숨기기
  }

  // MenuImage 안의 이미지 크기를 꽉 차게 설정
  img {
    width: 100%; // 부모 요소에 맞춰 크기 조정
    height: 100%; // 부모 요소에 맞춰 크기 조정
    object-fit: cover; // 비율 유지하며 꽉 차게 설정
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
    background: #b2e0b2;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 14px;
`;
const MenuImageWrapper = styled.div`
  width: 170px; // 고정된 너비
  height: 197px; // 고정된 높이
  display: flex; // 플렉스 박스를 사용하여 내부 요소를 정렬
  align-items: center; // 수직 중앙 정렬
  justify-content: center; // 수평 중앙 정렬
  overflow: hidden; // 내용이 넘칠 경우 숨기기
`;
