import React, { useState, useEffect } from "react";
import styled from "styled-components";
import background from "../images/background.png";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BarrierFreeInfo() {
  return (
    <Wrapper>
      <Header />
    </Wrapper>
  );
}

export default BarrierFreeInfo;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  background-image: url(${background});
  margin: 0;
`;
