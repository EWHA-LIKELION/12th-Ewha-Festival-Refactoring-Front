import React from "react";
import styled from "styled-components";
import greenlogo from "../images/greenlogo.svg";
import grayhamburger from "../images/grayhamburger.svg";

const ColorHeader = () => {
  return (
    <Container>
      <Hamburger
        src={grayhamburger}
        alt="hamburger menu"
        onClick={
          {
            /*모달로 띄울 건지, 페이지 변경으로 할 건지 결정해서 넣으면 될 것 같아!*/
          }
        }
      />
      <img src={greenlogo} alt="logo" />
    </Container>
  );
};

export default ColorHeader;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 20px 0;
`;

const Hamburger = styled.img`
  width: 22px;
  height: 18px;
  cursor: pointer;
`;
