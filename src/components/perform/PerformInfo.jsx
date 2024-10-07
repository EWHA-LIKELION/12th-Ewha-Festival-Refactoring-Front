import React, { useState } from "react";
import styled from "styled-components";
import arrowDown from "../../images/arrow-down.svg";

function PerformInfo() {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<Wrap>
			<Item>
				<Label>위치</Label>
				<Content>
					<p>학문관광장</p>
				</Content>
			</Item>
			<Item>
				<Label>운영시간</Label>
				<Content>
					<p>10일 수요일 - 10:00 ~ 15:00</p>
					<p>11일 목요일 - 10:00 ~ 15:00</p>
				</Content>
			</Item>
			<Item>
				<Label>부스소개</Label>
				<Description isExpanded={isExpanded}>
					<p>
						부스소개글부스소개글부스소개글부스소개글부스소개글부스소개글부스소개글부스소개글부스소개글부스소개글부스소개글부스소개글부스소개글부스소개글부스소개글부스소개글부스소개글부스소개글부스소개글
					</p>
					<button onClick={toggleExpand}>
						<img src={arrowDown} alt="Toggle arrow" className={isExpanded ? "rotated" : ""} />
					</button>
				</Description>
			</Item>
		</Wrap>
	);
}

export default PerformInfo;

const Wrap = styled.div`
	width: 352px;
	margin: 0 auto;
	margin-top: 16px;
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const Item = styled.div`
	display: flex;
	gap: 18px;
`;

const Label = styled.span`
	color: var(--bk01, #000);
	font-size: 13px;
	font-style: normal;
	font-weight: 600;
	line-height: 20px;
	letter-spacing: -0.5px;
	display: inline-block;
	width: 55px;
`;

const Content = styled.div`
	p {
		margin: 0;
		line-height: 20px;
		letter-spacing: -0.5px;
	}
	color: var(--bk01, #000);
	font-size: 13px;
	font-weight: 400;
	width: 270px;
`;

const Description = styled(Content)`
	display: flex;
	gap: 18px;

	p {
		max-height: ${(props) => (props.isExpanded ? "none" : "20px")};
		overflow: hidden;
		white-space: ${(props) => (props.isExpanded ? "normal" : "nowrap")};
		text-overflow: ellipsis;
	}

	button {
		width: 19px;
		height: 19px;
		border: none;
		background-color: transparent;

		img {
			transition: transform 0.3s ease;
			&.rotated {
				transform: rotate(180deg);
			}
		}
	}
`;
