import React from "react";
import styled from "styled-components";
import ewhaMeotsa from "../images/ewhaMeotsa.svg";
import insta from "../images/insta.svg";
import git from "../images/git.svg";

const Footer = () => {
  return (
    <Container>
      <Top>
        멋쟁이사자처럼 12기 | Likelion Ewha - 12th
        <br />
        <a
          href="http://pf.kakao.com/_htxexfd"
          target="_blank"
          rel="noopener noreferrer"
        >
          http://pf.kakao.com/_htxexfd
        </a>
      </Top>
      <Icons>
        <a
          href="https://linktr.ee/likelion.ewha"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={ewhaMeotsa} alt="멋사 링크트리" />
        </a>
        <a
          href="https://www.instagram.com/likelion_ewha"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={insta} alt="멋사 인스타" />
        </a>
        <a
          href="https://github.com/EWHA-LIKELION"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={git} alt="멋사 깃" />
        </a>
      </Icons>
      <Bottom>Copyright ⓒ Likelion Ewha 12th. All Rights Reserved.</Bottom>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 9.88rem;
  flex-shrink: 0;
  background: var(--2023-SWE_gray3, #efefef);
  border-top: 1px solid #9b9b9b;
`;

const Top = styled.p`
  margin: 1.3rem auto;
  color: var(--2023-SWE_gray2, #9b9b9b);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.65rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.04rem;

  a {
    color: var(--2023-SWE_gray2, #9b9b9b);
    font-family: Pretendard;
    font-size: 0.65rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.04rem;
    text-decoration-line: underline;
  }
`;

const Icons = styled.div`
  width: 5.65rem;
  display: flex;
  justify-content: space-between;

  img {
    cursor: pointer;
  }
`;

const Bottom = styled.p`
  margin: 1.21rem auto 2.19rem;
  color: var(--2023-SWE_gray2, #9b9b9b);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.52rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
