import React, { useState } from "react";
import styled from "styled-components";
import checkedBefore from "../../images/BoothEdit/checkbefor.svg";
import checkedAfter from "../../images/BoothEdit/checkafter.svg";

const BoothTimeSetting = () => {
  const [time, setTime] = useState("");
  const [ischecked, setischecked] = useState(false);

  const handlecheckclick = () => {
    setischecked(!ischecked);
  };

  const inputTimeColon = (value) => {
    // 콜론을 제거하고 숫자 길이를 확인
    const replaceTime = value.replace(/\:/g, "");

    if (replaceTime.length >= 4 && replaceTime.length < 5) {
      const hours = replaceTime.substring(0, 2);
      const minutes = replaceTime.substring(2, 4);

      if (!isFinite(hours + minutes)) {
        alert("문자는 입력하실 수 없습니다.");
        setTime("00:00");
        return;
      }

      if (parseInt(hours + minutes) > 2400) {
        alert("시간은 24시를 넘길 수 없습니다.");
        setTime("24:00");
        return;
      }

      if (parseInt(minutes) >= 60) {
        alert("분은 60분을 넘길 수 없습니다.");
        setTime(`${hours}:00`);
        return;
      }

      setTime(`${hours}:${minutes}`);
    } else if (replaceTime.length < 4) {
      setTime(replaceTime); // 길이가 4 미만일 때는 입력값 그대로 반영
    }
  };

  return (
    <Wrapper>
      <TimeWrapper>
        <CheckboxWrapper>
          <img
            src={ischecked ? checkedAfter : checkedBefore}
            alt="checkbox"
            onClick={handlecheckclick}
          />
          <Label htmlFor="check">10일 수요일</Label>
        </CheckboxWrapper>
        <TimeSetBox>
          <Input
            type="text"
            value={time}
            onChange={(e) => inputTimeColon(e.target.value)}
            placeholder="HH:MM"
            maxLength="4"
          />
          <div className="Timesepertater">~</div>
          <Input
            type="text"
            value={time}
            onChange={(e) => inputTimeColon(e.target.value)}
            placeholder="HH:MM"
            maxLength="4"
          />
        </TimeSetBox>
      </TimeWrapper>
      <TimeWrapper>
        <CheckboxWrapper>
          <img
            src={ischecked ? checkedAfter : checkedBefore}
            alt="checkbox"
            onClick={handlecheckclick}
          />
          <Label htmlFor="check"> 11일 목요일</Label>
        </CheckboxWrapper>
        <TimeSetBox>
          <Input
            type="text"
            value={time}
            onChange={(e) => inputTimeColon(e.target.value)}
            placeholder="HH:MM"
            maxLength="4"
          />
          <div className="Timesepertater">~</div>
          <Input
            type="text"
            value={time}
            onChange={(e) => inputTimeColon(e.target.value)}
            placeholder="HH:MM"
            maxLength="4"
          />
        </TimeSetBox>
      </TimeWrapper>
      <TimeWrapper>
        <CheckboxWrapper>
          <img
            src={ischecked ? checkedAfter : checkedBefore}
            alt="checkbox"
            onClick={handlecheckclick}
          />
          <Label htmlFor="check">12일 금요일</Label>
        </CheckboxWrapper>
        <TimeSetBox>
          <Input
            type="text"
            value={time}
            onChange={(e) => inputTimeColon(e.target.value)}
            placeholder="HH:MM"
            maxLength="4"
          />
          <div className="Timesepertater">~</div>
          <Input
            type="text"
            value={time}
            onChange={(e) => inputTimeColon(e.target.value)}
            placeholder="HH:MM"
            maxLength="4"
          />
        </TimeSetBox>
      </TimeWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100px; /* 높이 조정 */
  width: 350px; /* 너비 조정 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 5px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  img {
    margin-right: 5px;
    cursor: pointer;
  }
`;

const TimeSetBox = styled.div`
  display: flex;
  .Timesepertater {
    line-height: 50px;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    margin: 0px 6px;
  }
`;

const Input = styled.input`
  text-align: center;
  width: 73px;
  padding: 11px 10px;
  border-radius: 10px;
  border: 1px solid #e7e7e7;
`;

const Label = styled.label`
  font-weight: bold;
`;

export default BoothTimeSetting;
