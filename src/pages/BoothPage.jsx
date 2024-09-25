import React from "react";
import styled from "styled-components";

const BoothPage = () => {
  return (
    <Wrapper>
      <p>
        부스 페이지 입니다. 아마 주소 뒤에 아이디 값 넣어야 할 수도 있어서
        app.js 경로는 나중에 필요하면 수정하세요.
      </p>
    </Wrapper>
  );
};

export default BoothPage;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
`;
