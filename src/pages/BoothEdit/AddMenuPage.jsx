import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackArrow from "../../images/BoothDetail/arrow-left.svg";
import 임시메뉴이미지 from "../../images/BoothDetail/임시메뉴이미지.svg";
import instance from "../../api/axios"; // axios 인스턴스 임포트

const AddMenuPage = ({ accessToken }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const boothId = location.state?.id;
  const isEditMode = location.state?.isEditMode; // 수정 모드인지 확인

  const [menuImage, setMenuImage] = useState(임시메뉴이미지);
  const [menuName, setMenuName] = useState("");
  const [price, setPrice] = useState("");
  const [isVegan, setIsVegan] = useState(false);
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [menuId, setMenuId] = useState(location.state?.menuId || null); // 메뉴 ID

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMenuImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("menu", menuName);
    formData.append("img", menuImage); // FormData는 Blob 형태의 이미지를 필요로 함
    formData.append("price", price);
    formData.append("is_vegan", isVegan);
    formData.append("is_soldout", isSoldOut);

    try {
      let response;
      if (isEditMode) {
        // 수정 모드인 경우 PATCH 요청
        response = await instance.patch(
          `/manages/${boothId}/menus/${menuId}/`,
          formData
        );
      } else {
        // 신규 추가인 경우 POST 요청
        response = await instance.post(`/manages/${boothId}/menus/`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 적절한 토큰을 포함
          },
        });
      }

      if (response.status === 200 || response.status === 201) {
        // 성공적으로 메뉴 추가 또는 수정 시 처리
        alert(response.data.message);
        navigate("/some-route"); // 성공 시 리다이렉션할 경로
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message); // 에러 메시지 표시
      } else {
        alert("서버에 문제가 발생했습니다."); // 일반적인 에러 처리
      }
    }
  };

  return (
    <Wrapper>
      <Header>
        <img src={BackArrow} alt="뒤로가기" />
      </Header>
      <TitleFontSytle>대표 사진</TitleFontSytle>
      <ImageContainer>
        <img src={menuImage} alt="메뉴이미지" />
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
      </ImageContainer>
      <TitleFontSytle>메뉴 이름</TitleFontSytle>
      <Input
        type="text"
        value={menuName}
        onChange={(e) => setMenuName(e.target.value)}
        placeholder="메뉴명을 입력해주세요(최대 14자)"
      />
      <TitleFontSytle>가격</TitleFontSytle>
      <Input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="가격을 입력해주세요 예)4000"
      />
      <TitleFontSytle>비건 여부</TitleFontSytle>
      <Options>
        {["논비건", "비건", "페스코", "해당없음"].map((diet) => (
          <Option
            key={diet}
            onClick={() => setIsVegan(diet === "비건")}
            selected={isVegan && diet === "비건"}
          >
            {diet}
          </Option>
        ))}
      </Options>
      <TitleFontSytle>판매 여부</TitleFontSytle>
      <SalesOptions>
        {["판매 중", "판매 종료"].map((sales) => (
          <SalesOption
            key={sales}
            onClick={() => setIsSoldOut(sales === "판매 종료")}
            selected={isSoldOut && sales === "판매 종료"}
          >
            {sales}
          </SalesOption>
        ))}
      </SalesOptions>
      <SubmitButton onClick={handleSubmit}>작성 완료</SubmitButton>
    </Wrapper>
  );
};

export default AddMenuPage;

// 스타일 컴포넌트들 생략

const Wrapper = styled.div`
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
`;
const Header = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const TitleFontSytle = styled.div`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  align-self: self-start;
  justify-self: flex-start;
`;

const ImageContainer = styled.div`
  border-radius: 15px;
  width: 170px;
  height: 197px;
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
    width: 170px;
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

const Input = styled.input`
  width: 350px;
  padding: 11px 14px;
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid #e7e7e7;
  font-size: 12px;
`;

const Options = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const Option = styled.button`
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

const SalesOptions = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const SalesOption = styled.button`
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
