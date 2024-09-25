import React from "react";
import styled from "styled-components";

const LoginPage = () => {
  return (
    <Wrapper>
      <p>로그인 페이지 입니다.</p>
    </Wrapper>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
`;
