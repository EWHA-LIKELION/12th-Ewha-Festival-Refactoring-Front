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
import unchecked from "../../images/BoothEdit/checkbefor.svg";
import checked from "../../images/BoothEdit/checkafter.svg";

const BoothEditPage = () => {
  const navigate = useNavigate();

  // 부스 관련 상태 관리
  const [fetchedBoothId, setFetchedBoothId] = useState(null);
  const [boothImage, setBoothImage] = useState(null);
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

        // fetchedBoothData가 유효한지 확인한 후 상태 업데이트
        if (fetchedBoothData) {
          setBoothData(fetchedBoothData);
          setMenuDetails(fetchedBoothData.menus);
          console.log(fetchedBoothData.thumbnail); // fetchedBoothData.thumbnail 사용

          // 가져온 부스 데이터로 상태 업데이트
          setBoothName(fetchedBoothData.name);
          setOperatingHours(fetchedBoothData.operatingHours || "");
          setBoothDescription(fetchedBoothData.description || "");
          setContact(fetchedBoothData.admin_contact || "");
        } else {
          setErrorMessage("부스 데이터가 없습니다.");
        }

        // 공지사항 가져오기
        const noticesResponse = await instance.get(
          `/manages/${fetchedBoothId}/realtime_info/`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const noticeData = noticesResponse.data.notice;
        const noticesArray = Object.keys(noticeData).map((key) => ({
          id: noticeData[key].id,
          type: noticeData[key].notice_type,
          content: noticeData[key].content,
          createdAt: noticeData[key].created_at,
          borderColor:
            noticeData[key].notice_type === "판매공지" ? "#9747ff" : "#00F16F",
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
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        alert("유효한 이미지 파일을 업로드해야 합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        setBoothImage(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("thumbnail", file);

        // FormData에 추가된 파일 정보를 출력
        console.log("업로드할 파일:", file.name, file.size);

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
            const updatedThumbnail = response.data.thumbnail;
            if (updatedThumbnail) {
              setBoothImage(updatedThumbnail);
              alert("이미지가 성공적으로 업데이트되었습니다.");
            } else {
              alert("썸네일 업데이트에 실패했습니다.");
            }
          }
        } catch (error) {
          if (error.response) {
            console.error("서버 응답 오류:", error.response.data);
            alert(
              error.response.data.message ||
                "이미지 업데이트 중 오류가 발생했습니다."
            );
          } else {
            console.error("이미지 업데이트 중 오류 발생:", error);
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
          type: selectedNotice,
          createdAt: response.data.created_at, // 서버에서 반환된 created_at 사용
          borderColor: selectedNotice === "판매" ? "#9747ff" : "#00F16F",
        };
        window.location.reload(); // 페이지 새로고침
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
      const response = await instance.delete(
        `${process.env.REACT_APP_SERVER_PORT}/manages/${fetchedBoothId}/realtime_info/${infoId}/`,
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
      console.error("Error deleting notice:", error);
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
          is_opened: true,
          days: formattedDays, // 배열을 적절한 형식으로 변경
          thumbnail:
            boothImage && boothImage.includes("/media/thumbnail/")
              ? boothImage
              : undefined,
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
      console.error("부스 수정 중 오류 발생:", error);
      if (error.response) {
        alert(error.response.data.detail || error.response.data.message);
      } else {
        alert("부스 수정 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedDays = [...days];
    updatedDays[index].checked = !updatedDays[index].checked;
    setDays(updatedDays);
  };

  const handleDayInputChange = (index, field, value) => {
    const updatedDays = [...days];
    updatedDays[index][field] = value;
    setDays(updatedDays);
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
          <img
            src={
              boothData && boothData.thumbnail // boothData가 null이 아닌지 확인
                ? `${process.env.REACT_APP_SERVER_PORT}${boothData.thumbnail}`
                : 임시부스이미지
            }
            alt="부스이미지"
          />
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
                    {notice.type}
                  </div>
                  <div
                    className="delete"
                    onClick={() => handleNoticeDelete(notice.id)}
                  >
                    삭제
                  </div>
                </div>
                <div className="notice">{notice.content}</div>
                <div className="noticetime">
                  {new Date(notice.createdAt).toLocaleString()}
                </div>
              </Notice>
            ))
          ) : (
            <div>공지사항이 없습니다.</div>
          )}
        </NoticeBoxWrapper>
      </NoticeWrapper>

      {/* 시간 설정 부분 추가 */}
      <BoothTimeWrapper>
        <TitleFontStyle>부스 운영 시간</TitleFontStyle>
        <div className="row_box">
          {days.map((day, index) => (
            <div className="row" key={index}>
              <CheckboxWrapper onClick={() => handleCheckboxChange(index)}>
                <img
                  src={day.checked ? checked : unchecked} // 체크 상태에 따른 이미지
                  alt={day.checked ? "checked" : "unchecked"}
                />
                <span className="txt">{day.date}</span>
              </CheckboxWrapper>
              <input
                className="input"
                style={{ width: "47px" }}
                placeholder="예) 9:00"
                value={day.startTime}
                onChange={(e) =>
                  handleDayInputChange(index, "startTime", e.target.value)
                }
              />
              ~
              <input
                className="input"
                style={{ width: "47px" }}
                placeholder="예) 13:00"
                value={day.endTime}
                onChange={(e) =>
                  handleDayInputChange(index, "endTime", e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </BoothTimeWrapper>

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
              <MenuImage className="menuImage" menu={menu} key={menu.id} />
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

const BoothTimeWrapper = styled.div`
  margin-top: 25px;
  width: 90%;
  .row_box {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  .row {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .txt {
    margin-right: 10px;
    font-family: Pretendard;
    font-size: 13px;
  }
  .input {
    margin: 0 5px;
    padding: 5px;
    border: 1px solid #e7e7e7;
    border-radius: 10px;
    width: 73px;
    padding: 11px 14px;
    font-size: 12px;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    width: 20px; /* 이미지 크기 조정 */
    height: 20px; /* 이미지 크기 조정 */
    margin-right: 10px;
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
  height: 71px;
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
    width: 56px;
    height: 23px;
    border-radius: 5.385px;
    color: white;
    font-size: 10.769px;
    font-weight: 700;
    text-align: center;
    line-height: 23px;
    margin-bottom: 15px;
    align-self: flex-start; // 수정된 정렬 방식
    margin-left: 10px;
  }
  .notice {
    font-size: 12px;
    font-weight: 500;
    width: 322px;
    margin-bottom: 15px;
    margin-left: 10px;
  }

  .noticetime {
    color: #8e8e8e;
    font-size: 9.761px;
    font-weight: 600;
    width: 322px;
    text-align: right;
  }
`;

const BoothIntroduce = styled.div`
  width: 350px;
  margin-top: 10px;
  textarea {
    width: 327.914px;
    height: 82.754px;
    padding: 11.379px 14.482px;
    border-radius: 15.516px;
    border: 1.034px solid #e7e7e7;
    font-size: 12.413px;
    font-weight: 500;
    resize: none;
    margin-top: 20px;
  }
`;

const MenuWrapper = styled.div`
  width: 350px;
  margin-top: 20px;
`;

const MenuBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 170px));
  box-sizing: border-box;
  grid-auto-rows: 197px;
  gap: 7px;
  margin-top: 20px;
`;

const BoothContact = styled.div`
  width: 350px;
  margin-top: 20px;
  textarea {
    width: 327.914px;
    height: 82.754px;
    padding: 11.379px 14.482px;
    border-radius: 15.516px;
    border: 1.034px solid #e7e7e7;
    font-size: 12.413px;
    font-weight: 500;
    resize: none;
    margin-top: 20px;
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
  margin-top: 20px;
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
