import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import background from "../../images/background.png";
import whitelogo from "../../images/whitelogo.svg";
import showManage from "../../images/showManage.svg";

const BoothMainPage = () => {
  const nickname = localStorage.getItem("nickname");
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("nickname");
    localStorage.removeItem("user_id");
    localStorage.removeItem("type");
    navigate("/login");
  };

  return (
    <Wrapper>
      <LogoContainer>
        <img src={whitelogo} alt="logo" />
      </LogoContainer>
      <Title>
        2024
        <br />
        이화여대 대동제
      </Title>
      <MainBox>
        <P>
          {nickname} 공연관리자님
          <br />
          2024 대동제를
          <br />잘 운영해주세요🍀
        </P>
        <LinkBox>
          <img
            src={showManage}
            alt="내 공연 관리하기"
            onClick={() => handleNavigate("/detial/admin")}
          />
        </LinkBox>
      </MainBox>
      <Logout onClick={handleLogout}>로그아웃</Logout>
    </Wrapper>
  );
};

export default BoothMainPage;

const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  background-image: url(${background});
  overflow: scroll;
  background-repeat: repeat-y;
  margin: 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const LogoContainer = styled.div`
  margin: 3rem 1.2rem;
  display: flex;
  justify-content: end;
`;

const Title = styled.div`
  color: #ffffff;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.625rem;
  letter-spacing: -0.03125rem;
  margin-top: 2rem;
`;

const MainBox = styled.div`
  margin: 2.19rem auto 0;
  background: linear-gradient(
    158deg,
    rgba(67, 255, 153, 0.4) 3.91%,
    rgba(247, 247, 247, 0.4) 102.63%
  );
  aspect-ratio: 330 / 429;
  width: 77%;
  flex-shrink: 0;
  border-radius: 0.9375rem;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1), 0px 0px 4px 0px #fff inset;
  backdrop-filter: blur(10px);
  padding: 1.75rem 1.19rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const P = styled.p`
  margin: 0;
  color: white;
  font-family: Pretendard;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.0625rem;
  letter-spacing: -0.03125rem;
`;

const LinkBox = styled.div`
  display: flex;
  padding: 0.8rem;
`;

const Logout = styled.div`
  margin: 1.38rem auto;
  width: fit-content;
  color: var(--wh, #fff);
  font-family: Pretendard;
  font-size: 0.95456rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3125rem;
  letter-spacing: -0.01988rem;
  text-decoration-line: underline;
  cursor: pointer;
`;
