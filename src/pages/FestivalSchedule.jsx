import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import TFBoothItem from "../components/TFBoothItem";
import TFEventItem from "../components/TFEventItem";
import instance from "../api/axios";
import Footer from "../components/Footer";

function FestivalSchedule() {
  const [selectedDay, setSelectedDay] = useState("수"); // 요일 기본값
  const [selectedType, setSelectedType] = useState("기획부스"); // 부스 종류 기본값
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태 관리
  const [description, setDescription] = useState(
    "기획부스에서 참여할 수 있는 체험을 알아봐요🍀"
  ); // 선택된 부스 설명
  const [allEvents, setAllEvents] = useState([]); // 전체 행사 데이터
  const [allBooths, setAllBooths] = useState([]); // 전체 부스 데이터

  // 선택한 요일과 부스 타입에 따라 필터링된 이벤트 및 부스 데이터
  const filteredEvents = allEvents.filter((event) =>
    event.dayofweek.includes(selectedDay)
  );

  const filteredBooths = allBooths.filter(
    (booth) => booth.booth_category === selectedType
  );

  // API에서 데이터 불러오기
  useEffect(() => {
    const fetchFestivalData = async () => {
      try {
        const response = await instance.get(
          `${process.env.REACT_APP_SERVER_PORT}/booths/main/tf/`
        );
        const { show, booth } = response.data;
        console.log("Event Data:", show); // 받아온 이벤트 데이터 구조 확인
        console.log("Booth Data:", booth); // 받아온 부스 데이터 구조 확인
        setAllEvents(show);
        setAllBooths(booth);
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다.", error);
      }
    };

    fetchFestivalData();
  }, []);

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    let descriptionMessage;
    switch (type) {
      case "기획부스":
        descriptionMessage = "기획부스에서 참여할 수 있는 체험을 알아봐요🍀";
        break;
      case "권리팀부스":
        descriptionMessage = "권리팀부스에서 참여할 수 있는 체험을 알아봐요🍀";
        break;
      case "대외협력팀부스":
        descriptionMessage =
          "대외협력팀부스에서 참여할 수 있는 체험을 알아봐요🍀";
        break;
      default:
        descriptionMessage = "부스를 선택해 주세요";
    }
    setDescription(descriptionMessage);
  };

  const handleDaySelection = (day) => {
    setSelectedDay(day);
  };

  // 팝업 외부 클릭 시 닫기
  const handleClosePopup = (e) => {
    if (e.target === e.currentTarget) {
      setIsPopupOpen(false); // 팝업 외부 클릭 시 팝업 닫기
    }
  };

  return (
    <Wrapper>
      <Header />
      <EventContainer>
        <Top>
          <Title>메인행사</Title>
          <DaySelection>
            <DayButton
              selected={selectedDay === "수"}
              onClick={() => handleDaySelection("수")}
            >
              수
            </DayButton>
            <DayButton
              selected={selectedDay === "목"}
              onClick={() => handleDaySelection("목")}
            >
              목
            </DayButton>
            <DayButton
              selected={selectedDay === "금"}
              onClick={() => handleDaySelection("금")}
            >
              금
            </DayButton>
          </DaySelection>
        </Top>
        <BoothList>
          {filteredEvents.map((event) => (
            <TFEventItem key={event.id} booth={event} />
          ))}
        </BoothList>
      </EventContainer>
      <BoothContainer>
        <Top>
          <Title>상설 부스</Title>
          <TypeSelection onClick={() => setIsPopupOpen(true)}>
            {selectedType}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
            >
              <path
                d="M15.77 7.58545L10.6083 12.7471C9.99873 13.3567 9.00123 13.3567 8.39165 12.7471L3.22998 7.58545"
                stroke="white"
                strokeWidth="2"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </TypeSelection>
        </Top>
        <BoothItemList>
          {filteredBooths.map((booth) => (
            <TFBoothItem key={booth.id} booth={booth} />
          ))}
        </BoothItemList>
      </BoothContainer>

      {isPopupOpen && (
        <PopupContainer onClick={handleClosePopup}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <PopupTitle>부스 타입 선택</PopupTitle>
            <ButtonWrapper>
              <PopupOption
                onClick={() => handleTypeSelection("기획부스")}
                selected={selectedType === "기획부스"}
              >
                기획부스
              </PopupOption>
              <PopupOption
                onClick={() => handleTypeSelection("권리팀부스")}
                selected={selectedType === "권리팀부스"}
              >
                권리팀부스
              </PopupOption>
              <PopupOption
                onClick={() => handleTypeSelection("대외협력팀부스")}
                selected={selectedType === "대외협력팀부스"}
              >
                대외협력팀부스
              </PopupOption>
            </ButtonWrapper>
            <Description>{description}</Description>
          </PopupContent>
        </PopupContainer>
      )}
      <Footer />
    </Wrapper>
  );
}

export default FestivalSchedule;

const Wrapper = styled.div`
  margin: 0;
`;

const EventContainer = styled.div`
  padding: 20px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.div`
  color: var(--bk01, #000);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px; /* 108.333% */
  letter-spacing: -0.5px;
`;

const DaySelection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 129px;
  height: 36px;
  gap: -6px;
  border-radius: 30px;
  background: var(--gray04, #c1d9cc);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
`;

const DayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 47px;
  height: 36px;
  gap: 10px;
  border-radius: 30px;
  border: 1px solid ${(props) => (props.selected ? "#03d664" : "#C1D9CC")};
  background-color: ${(props) => (props.selected ? "#00f16f" : "#C1D9CC")};
  cursor: pointer;

  color: var(--wh01, var(--wh, #fff));
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 133.333% */
  letter-spacing: -0.5px;
`;

const BoothContainer = styled.div`
  padding: 20px;
  margin-bottom: 132px;
`;

const BoothItemList = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(170px, 1fr)
  ); /* 수정된 부분 */
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const TypeSelection = styled.div`
  display: flex;
  padding: 8px 17px;
  justify-content: flex-end;
  align-items: center;
  gap: 3px;
  border-radius: 30px;
  border: 1px solid var(--green02, #03d664);
  background: var(--green_01, #00f16f);
  cursor: pointer;
  color: var(--wh01, var(--wh, #fff));
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 133.333% */
  letter-spacing: -0.5px;
`;

const BoothList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 170px));
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const PopupContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  max-width: 390px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1001;
`;

const PopupContent = styled.div`
  background: var(--wh, #fff);
  width: 390px;
  padding: 30px 23px 248px 23px;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  flex-shrink: 0;
  box-sizing: border-box;
`;

const PopupTitle = styled.h2`
  color: var(--bk01, #000);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 100% */
  letter-spacing: -0.5px;
  margin: 0px;
  margin-bottom: 18px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
`;

const PopupOption = styled.button`
  display: flex;
  padding: 8px 17px;
  justify-content: center;
  align-items: center;
  gap: 3px;
  border-radius: 30px;
  border: 1px solid ${(props) => (props.selected ? "#03d664" : "#F2F2F2")};
  background-color: ${(props) => (props.selected ? "#00f16f" : "#F7F7F7")};

  color: ${(props) => (props.selected ? "#FFF" : "#BBB")};
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 133.333% */
  letter-spacing: -0.5px;
  cursor: pointer;
`;

const Description = styled.div`
  color: var(--gray01, #bbb);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.5px;
`;
