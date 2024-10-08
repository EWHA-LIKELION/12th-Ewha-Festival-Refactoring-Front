import React, { useState, useEffect } from "react";
import styled from "styled-components";
import background from "../images/background.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Trash from "../components/Trash";

//images
import trashmap from "../images/trashmap.svg";
import maingate from "../images/TrashMap/maingate.svg";
import auditorium from "../images/TrashMap/auditorium.svg";
import ecc from "../images/TrashMap/ecc.svg";
import education from "../images/TrashMap/education.svg";
import humanecology from "../images/TrashMap/humanecology.svg";
import humanities from "../images/TrashMap/humanities.svg";
import posco from "../images/TrashMap/posco.svg";
import shinsegae from "../images/TrashMap/shinsegae.svg";
import studentunion from "../images/TrashMap/studentunion.svg";
import studentunionGas from "../images/TrashMap/studentunion-gas.svg";
import humanecologyGas from "../images/TrashMap/humanecology-gas.svg";
import auditoriumGas from "../images/TrashMap/auditorium-gas.svg";

const TrashPage = () => {
  const [activeFilter, setActiveFilter] = useState("trash");

  const renderTrashItems = () => {
    if (activeFilter === "trash") {
      // 쓰레기통 필터
      return (
        <>
          <Trash
            text1="정문"
            text2="잔디광장 24번 부스 옆"
            imageSrc={maingate}
          />
          <Trash
            text1="대강당"
            text2="대강당 측면 입구 부근"
            imageSrc={auditorium}
          />
          <Trash
            text1="학생문화관"
            text2="학생문화관 44번 부스 옆"
            imageSrc={studentunion}
          />
          <Trash
            text1="생활환경관"
            text2="생활환경관 15번 부스 옆"
            imageSrc={humanecology}
          />
          <Trash text1="학관" text2="학관 22번 부스 옆" imageSrc={humanities} />
          <Trash
            text1="포스코관"
            text2="포스코관 8-9번 부스 사이"
            imageSrc={posco}
          />
          <Trash text1="후윳길" text2="후윳길 1-5번 부스 사이" imageSrc={ecc} />
          <Trash
            text1="교육관"
            text2="교육관 4-5번 부스 사이"
            imageSrc={education}
          />
          <Trash
            text1="신세계관"
            text2="신세계관 1번 부스 옆"
            imageSrc={shinsegae}
          />
        </>
      );
    } else if (activeFilter === "operation") {
      // 다회용기/부탄가스 수거 필터
      return (
        <>
          <Trash
            text1="대강당"
            text2="대강당 14번 부스 옆"
            imageSrc={auditoriumGas}
          />
          <Trash
            text1="학생문화관"
            text2="학생문화관 29, 51번 부스 옆"
            imageSrc={studentunionGas}
          />
          <Trash
            text1="생활환경관"
            text2={
              <>
                다회용기: 생활환경관 32번 부스 옆 <br />
                부탄가스: 생활환경관 14번, 54번 부스 옆
              </>
            }
            imageSrc={humanecologyGas}
          />
        </>
      );
    }
    return null;
  };

  return (
    <Wrapper>
      <Header />
      <Content>
        <Ment>쓰레기통 및 그릇 반납</Ment>
        <img src={trashmap} alt="Trash Map" />
        <BottomContent>
          <Filter>
            <FilterButton
              onClick={() => setActiveFilter("trash")}
              active={activeFilter === "trash"}
            >
              쓰레기통
            </FilterButton>
            <FilterButton
              onClick={() => setActiveFilter("operation")}
              active={activeFilter === "operation"}
            >
              다회용기/부탄가스 수거
            </FilterButton>
          </Filter>
          {renderTrashItems()}
        </BottomContent>
      </Content>
      <Footer />
    </Wrapper>
  );
};

export default TrashPage;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);

  margin: 0;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 90px;
`;

const Ment = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 37px;
  margin-bottom: 17px;
`;

const BottomContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Filter = styled.div`
  margin: 0 0 23px 0;
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: flex-start;
`;

const FilterButton = styled.button`
  height: 34px;
  padding: 7px 17px;
  gap: 10px;
  border-radius: 30px;
  border: 1px solid var(--gray02, #f2f2f2);
  background: ${({ active }) =>
    active ? "#00F16F" : "var(--gray03, #f7f7f7)"};
  color: ${({ active }) => (active ? "#FFFFFF" : "var(--gray01, #bbb)")};
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.5px;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background: #00f16f;
    color: #ffffff;
  }
`;
