import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header"; // Header 컴포넌트 가져오기
import BoothItem from "../components/BoothItem"; // 분리된 BoothItem 컴포넌트 가져오기
import instance from "../api/axios"; // axios 인스턴스 가져오기

const ShowPage = () => {
  const [selectedDay, setSelectedDay] = useState("수"); // 요일 기본값
  const [selectedType, setSelectedType] = useState("전체"); // 부스 종류 기본값
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태 관리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [description, setDescription] = useState(
    "전체 공연에 대해 알 수 있어요 🍀"
  ); // 선택된 부스 설명
  const [boothData, setBoothData] = useState([]); // 부스 데이터를 상태로 저장
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태 관리

  const boothsPerPage = 10; // 한 페이지당 보여줄 부스 수
  const maxPageButtons = 5; // 한번에 보여줄 페이지 버튼의 최대 개수
  const [pageGroup, setPageGroup] = useState(0); // 페이지 그룹 상태

  useEffect(() => {
    // 백엔드에서 데이터를 받아오는 함수
    const fetchBoothData = async () => {
      try {
        const response = await instance.get(`/shows/main/`); // 백엔드 API 호출
        setBoothData(response.data.data); // 백엔드에서 받은 데이터 설정
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error("Error fetching booth data:", error);
        setLoading(false); // 로딩 실패 시에도 로딩 상태를 false로
      }
    };

    fetchBoothData(); // 페이지가 로드될 때 데이터 받아오기
  }, [selectedDay, selectedType]); // 선택된 요일과 종류가 변경될 때마다 데이터 갱신

  // 선택한 요일과 카테고리에 맞는 부스를 필터링 (전체 카테고리인 경우 '밴드'와 '댄스' 모두 포함)
  const filteredBooths = boothData.filter(
    (booth) =>
      booth.dayofweek.includes(selectedDay) &&
      (selectedType === "전체" || booth.category === selectedType)
  );

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredBooths.length / boothsPerPage);

  // 페이지네이션 계산
  const indexOfLastBooth = currentPage * boothsPerPage;
  const indexOfFirstBooth = indexOfLastBooth - boothsPerPage;
  const currentBooths = filteredBooths.slice(
    indexOfFirstBooth,
    indexOfLastBooth
  );

  // 페이지네이션에서 표시할 페이지 번호 그룹 계산
  const startPage = pageGroup * maxPageButtons + 1;
  const endPage = Math.min((pageGroup + 1) * maxPageButtons, totalPages);

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    let descriptionMessage;
    switch (type) {
      case "전체":
        descriptionMessage = "전체 공연에 대해 알 수 있어요 🍀";
        break;
      case "밴드":
        descriptionMessage = "밴드 공연에 대해 알 수 있어요 🍀";
        break;
      case "댄스":
        descriptionMessage = "댄스 공연에 대해 알 수 있어요 🍀";
        break;
      default:
        descriptionMessage = "공연을 선택해 주세요";
    }
    setDescription(descriptionMessage);
  };

  const handleDaySelection = (day) => {
    setSelectedDay(day);
    setCurrentPage(1); // 요일이 바뀔 때 페이지 번호를 1로 초기화
  };

  // 팝업 외부 클릭 시 닫기
  const handleClosePopup = (e) => {
    if (e.target === e.currentTarget) {
      setIsPopupOpen(false); // 팝업 외부 클릭 시 팝업 닫기
    }
  };

  // 화살표 클릭 시 페이지 그룹 이동
  const handleNextPageGroup = () => {
    if ((pageGroup + 1) * maxPageButtons < totalPages) {
      setPageGroup(pageGroup + 1);
    }
  };

  const handlePrevPageGroup = () => {
    if (pageGroup > 0) {
      setPageGroup(pageGroup - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // 데이터 로딩 중일 때 표시
  }

  return (
    <>
      {/* Header 컴포넌트 추가 */}
      <Header />
      <Wrapper>
        {/* 요일과 부스 종류 선택 */}
        <SelectionWrapper>
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
        </SelectionWrapper>
        {/* 검색 결과 표시 */}
        <SearchResult>총 {filteredBooths.length}개의 공연</SearchResult>
        {/* 부스 목록 */}
        <BoothList>
          {currentBooths.map((booth) => (
            <BoothItem key={booth.id} booth={booth} />
          ))}
        </BoothList>
        {/* 페이지 넘버 */}
        <Pagination>
          {pageGroup > 0 && (
            <ArrowButtonLeft onClick={handlePrevPageGroup}>
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 7.00688L12 9.92965C12 13.553 9.64853 15.0417 6.77673 13.2246L4.46529 11.7577L2.15385 10.2909C-0.717949 8.47374 -0.717949 5.50719 2.15385 3.69004L4.46529 2.22319L6.77674 0.756339C9.64853 -1.02797 12 0.449832 12 4.08413L12 7.00688Z"
                  fill="#F2F2F2"
                />
              </svg>
            </ArrowButtonLeft>
          )}
          {Array.from({ length: endPage - startPage + 1 }, (_, idx) => (
            <PageButton
              key={startPage + idx}
              onClick={() => setCurrentPage(startPage + idx)}
              selected={currentPage === startPage + idx}
            >
              {startPage + idx}
            </PageButton>
          ))}
          {(pageGroup + 1) * maxPageButtons < totalPages && (
            <ArrowButtonRight onClick={handleNextPageGroup}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
              >
                <path
                  d="M0 6.99361V4.27962C0 0.915079 2.35147 -0.467329 5.22326 1.22002L7.53471 2.5821L9.84615 3.94418C12.7179 5.63153 12.7179 8.38618 9.84615 10.0735L7.53471 11.4356L5.22326 12.7977C2.35147 14.4545 0 13.0823 0 9.7076V6.99361Z"
                  fill="#F2F2F2"
                />
              </svg>
            </ArrowButtonRight>
          )}
        </Pagination>
        {/* 부스 종류 선택 팝업 */}
        {isPopupOpen && (
          <Popup onClick={handleClosePopup}>
            <PopupContent onClick={(e) => e.stopPropagation()}>
              {/* 내부 클릭 이벤트가 전파되지 않도록 설정 */}
              <PopupTitle>어떤 공연을 볼까요?</PopupTitle>
              <ButtonWrapper>
                <TypeButton
                  onClick={() => handleTypeSelection("전체")}
                  selected={selectedType === "전체"}
                >
                  전체
                </TypeButton>
                <TypeButton
                  onClick={() => handleTypeSelection("밴드")}
                  selected={selectedType === "밴드"}
                >
                  밴드
                </TypeButton>
                <TypeButton
                  onClick={() => handleTypeSelection("댄스")}
                  selected={selectedType === "댄스"}
                >
                  댄스
                </TypeButton>
              </ButtonWrapper>
              {/* 부스 설명 */}
              <Description>{description}</Description>
            </PopupContent>
          </Popup>
        )}
      </Wrapper>
    </>
  );
};

export default ShowPage;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  max-width: 390px;
  display: flex;
  flex-direction: column;
  padding-left: 17px;
  padding-right: 17px;
`;

/* 요일과 부스 종류 선택 */
const SelectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
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

/* 검색 결과 */
const SearchResult = styled.div`
  width: 151px;
  height: 15px;
  flex-shrink: 0;
  color: var(--gray05, #8e8e8e);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.5px;
  margin-bottom: 9px;
`;

/* 부스 목록 */
const BoothList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 170px));
  gap: 16px;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
`;

/* 페이지 넘버 */
const Pagination = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 300px;
`;

const PageButton = styled.button`
  display: flex;
  width: 38px;
  padding: 8px 17px;
  justify-content: center;
  align-items: center;
  gap: 3px;
  margin-left: 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.selected ? "#00F16F" : "#F7F7F7")};
  border: 1px solid ${(props) => (props.selected ? "#03D664" : "#F2F2F2")};
  cursor: pointer;

  color: ${(props) => (props.selected ? "#FFF" : "#BBB")};
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.5px;
`;

const ArrowButtonLeft = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: none;
  cursor: pointer;
  padding: 0px;
`;

const ArrowButtonRight = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: none;
  cursor: pointer;
  padding: 0px;
  margin-left: 10px;
`;
/* 팝업 스타일 */
const Popup = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const PopupContent = styled.div`
  background: var(--wh, #fff);
  width: 100%; /* max-width 대신 width를 사용 */
  padding: 30px 23px 248px 23px; /* padding 값은 유지 */
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  flex-shrink: 0;
  box-sizing: border-box; /* 이 부분 추가 */
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

const TypeButton = styled.button`
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
