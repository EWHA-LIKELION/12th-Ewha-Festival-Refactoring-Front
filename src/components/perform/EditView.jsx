import React, { useState } from "react";
import styled from "styled-components";
import arrowLeft from "../../images/arrowLeft.svg";
import checked from "../../images/checked.svg";
import mainImage from "../../images/main1.png";
import unChecked from "../../images/unChecked.svg";
import { BackButton, HeaderNav, Logo } from "./common";

export default function EditView() {
  const [image, setImage] = useState(mainImage);
  const [activeButton, setActiveButton] = useState("운영 중"); // 기본 선택된 버튼

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = (status) => {
    setActiveButton(status);
  };

  return (
    <Wrap>
      <HeaderNav>
        <BackButton>
          <img src={arrowLeft} alt="back" />
        </BackButton>
        <Logo />
      </HeaderNav>

      <LabelTitle style={{ marginTop: "16px" }}>대표 사진</LabelTitle>
      <ImageWrap>
        <img src={image} alt="공연" />
        <ChangeText
          onClick={() => document.getElementById("fileInput").click()}
        >
          사진 교체하기
        </ChangeText>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageChange}
        />
      </ImageWrap>
      <LabelTitle style={{ marginTop: "25px" }}>부스 이름</LabelTitle>
      <input className="input" placeholder="공연명을 입력해주세요(최대 14자)" />

      <LabelTitle style={{ marginTop: "35px" }}>실시간 공지사항</LabelTitle>
      <textarea
        rows={5}
        className="input"
        placeholder="실시간으로 알리고 싶은 정보를 작성해주세요(최대 100자)"
      />

      <LabelTitle style={{ marginTop: "35px" }}>공연 운영시간</LabelTitle>
      <div className="row_box">
        <div className="row">
          <input type="checkbox" className="checkbox" />
          <span className="txt">10일 수요일</span>
          <input
            className="input"
            style={{ width: "47px" }}
            placeholder="예)9:00"
          />
          ~
          <input
            className="input"
            style={{ width: "47px" }}
            placeholder="예)13:00"
          />
        </div>
        <div className="row">
          <input type="checkbox" className="checkbox" defaultChecked={true} />
          <span className="txt">11일 목요일</span>
          <input
            className="input"
            style={{ width: "47px" }}
            placeholder="예)9:00"
          />
          ~
          <input
            className="input"
            style={{ width: "47px" }}
            placeholder="예)13:00"
          />
        </div>
        <div className="row">
          <input type="checkbox" className="checkbox" defaultChecked={true} />
          <span className="txt">12일 금요일</span>
          <input
            className="input"
            style={{ width: "47px" }}
            placeholder="예)9:00"
          />
          ~
          <input
            className="input"
            style={{ width: "47px" }}
            placeholder="예)13:00"
          />
        </div>
      </div>

      <LabelTitle style={{ marginTop: "69px" }}>공연 소개글</LabelTitle>
      <textarea
        rows={5}
        className="input"
        placeholder="공연에 대해 알리는 소개글을 작성해주세요(최대 100자)"
      />

      <LabelTitle style={{ marginTop: "69px" }}>공연 운영진 연락처</LabelTitle>
      <textarea
        rows={5}
        className="input"
        placeholder="문의를 위한 공연 운영진 연락처를 남겨주세요
							예) 카카오톡 오픈채팅 링크"
      />

      <LabelTitle style={{ marginTop: "55px" }}>운영여부</LabelTitle>
      <div className="row">
        <button
          className={` ${activeButton === "운영 중" ? "btn1" : "btn2"}`}
          onClick={() => handleButtonClick("운영 중")}
        >
          운영 중
        </button>
        <button
          className={` ${activeButton === "운영 종료" ? "btn1" : "btn2"}`}
          onClick={() => handleButtonClick("운영 종료")}
        >
          운영 종료
        </button>
      </div>

      <LabelTitle style={{ marginTop: "121px" }} className="blind">
        submit
      </LabelTitle>
      <button className="btn3">작성 완료</button>
    </Wrap>
  );
}

const Wrap = styled.div`
  button {
    cursor: pointer;
  }
  * {
    margin: 0;
  }
  padding: 0 20px;
  width: 350px;
  padding-bottom: 178px;
  margin: 0 auto;
  .blind {
    visibility: hidden;
  }
  .input {
    display: flex;
    width: 317px;
    padding: 11px 14px;
    border-radius: 15px;
    border: 1px solid #e7e7e7;
    background: linear-gradient(334deg, #fff 71.49%, #fff 169%);
    box-shadow: 0px 0px 9px 0px rgba(255, 255, 255, 0.25) inset;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: -0.5px;

    &::placeholder {
      color: var(--gray01, #bbb);
    }
    &:focus {
      outline: none;
    }
  }

  .row {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .row_box {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .checkbox {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    background-image: url(${unChecked});
    background-size: cover;
    border: none;
    outline: none;
  }

  .checkbox:checked {
    background-image: url(${checked});
    background-size: cover;
  }

  .row_box.txt {
    color: #000;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: -0.5px;
    width: 62px;
  }

  .btn1 {
    display: flex;
    padding: 7px 17px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 30px;
    border: 1px solid var(--green02, #03d664);
    background: var(--green_01, #00f16f);
    color: var(--wh, #fff);
    text-align: center;
    font-size: 15px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: -0.5px;
  }

  .btn2 {
    display: flex;
    padding: 7px 17px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 30px;
    border: 1px solid var(--gray02, #f2f2f2);
    background: var(--gray03, #f7f7f7);
    color: var(--gray01, #bbb);
    text-align: center;
    font-size: 15px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: -0.5px;
  }

  .btn3 {
    display: inline-flex;
    padding: 10px 146px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
    border: 1px solid #03d664;
    background: #07fb77;
    color: var(--wh, #fff);
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 125% */
    letter-spacing: -0.5px;
    white-space: nowrap;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  width: 350px;
  height: 197px;
  margin: 0 auto;
  margin-top: 16px;

  img {
    display: inline-flex;
    height: 197px;
    align-items: center;
    flex-shrink: 0;
    border-radius: 15px;
    box-shadow: 0px 0px 9px 0px rgba(255, 255, 255, 0.25) inset;
    width: 100%;
    object-fit: cover;
  }
`;

const ChangeText = styled.div`
  position: absolute;
  bottom: 0; /* 이미지 하단에 위치 */
  left: 0;
  right: 0;
  height: 54px;
  display: flex;
  height: 54px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.34);

  color: var(--wh, #fff);
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.5px;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
`;

const LabelTitle = styled.h3`
  color: #000;
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.5px;
  margin-bottom: 8px;
`;
