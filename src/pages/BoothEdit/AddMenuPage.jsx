import React, { useState } from "react";
import styled from "styled-components";
import BackArrow from "../../images/BoothDetail/arrow-left.svg";
import 임시메뉴이미지 from "../../images/BoothDetail/임시메뉴이미지.svg";

const AddMenuPage = () => {
  const [menuImage, setMenuImage] = useState(임시메뉴이미지);
  const [menuName, setMenuName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedDiet, setSelectedDiet] = useState("");
  const [selectedSales, setSelectedSales] = useState("");

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

  const handleDietSelect = (diet) => {
    setSelectedDiet(diet);
  };

  const handleSalesSelect = (sales) => {
    setSelectedSales(sales);
  };

  const handleSubmit = () => {
    const menuDetails = {
      menuImage,
      menuName,
      price,
      selectedDiet,
      selectedSales,
    };
    localStorage.setItem("menuDetails", JSON.stringify(menuDetails));
    alert("메뉴가 저장되었습니다.");
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
        {["논비건", "페스코", "비건", "해당없음"].map((diet) => (
          <Option
            key={diet}
            onClick={() => handleDietSelect(diet)}
            selected={selectedDiet === diet}
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
            onClick={() => handleSalesSelect(sales)}
            selected={selectedSales === sales}
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
