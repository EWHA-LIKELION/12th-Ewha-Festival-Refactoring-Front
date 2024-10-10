import styled from "styled-components";
import logoimg from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const HeaderNav = styled.nav`
	width: 350px;
	height: 57px;
	display: flex;
	align-items: center;
	justify-content: ${(props) => (props.children.length > 1 ? "space-between" : "flex-end")};
`;

export const EditButton = styled.button`
	display: flex;
	padding: 7px 17px;
	justify-content: center;
	align-items: center;
	gap: 10px;
	border-radius: 30px;
	border: 1px solid var(--gray02, #f2f2f2);
	background: var(--gray03, #f7f7f7);
	color: var(--gray01, #bbb);
	text-align: center;
	font-family: "Pretendard";
	font-size: 15px;
	font-style: normal;
	font-weight: 700;
	line-height: 20px; /* 133.333% */
	letter-spacing: -0.5px;
`;

// 리액트 컴포넌트에서 스타일링된 버튼을 사용
const EditButtonComponent = ({ boothId }) => {
  const navigate = useNavigate();

  return (
    <EditButton
      id='showModifyBtn'
      onClick={() => {
        navigate("/detail/admin/edit", { state: { id: boothId } });
      }}
    >
      Edit
    </EditButton>
  );
};

export default EditButtonComponent;

export const ResetButton = styled.button`
	background-color: #0000;
	padding: 0;
	margin: 0;
	border: none;
	cursor: pointer;
`;

export const BackButton = styled.button`
	background-color: #0000;
	padding: 0;
	margin: 0;
	border: none;
	cursor: pointer;
	width: 24px;
	height: 24px;
`;

export const Logo = (second) => {
	return (
		<LogoWrap>
			<Link to={"/"}>
				<img src={logoimg}></img>
			</Link>
		</LogoWrap>
	);
};

const LogoWrap = styled.div`
	width: 162px;
	height: 20px;
`;
