import React from "react";
import styled from "styled-components";
import archiveTick from "../../images/archive-tick.svg";
import messages from "../../images/messages-2.svg";
<<<<<<< HEAD
=======
import scrapBefore from "../../images/BoothDetail/scrapbefore.svg";
>>>>>>> master

function InteractionPanel() {
	return (
		<Wrap>
			<button>
				운영진 연락처 <img src={messages} />
			</button>
			<div>
				<span>1000명이 스크랩했어요</span>
				<button>
					<img src={archiveTick} alt="archive-tick" />
				</button>
			</div>
		</Wrap>
	);
}

export default InteractionPanel;

const Wrap = styled.div`
	white-space: nowrap;
	padding-top: 23px;
	margin-right: 9px;
	display: flex;
	gap: 66px;
	align-items: center;
	button {
		border: none;
		background-color: transparent;
	}
	& > button {
		display: flex;
		padding: 6px 17px;
		justify-content: center;
		align-items: center;
		gap: 6px;
		border-radius: 30px;
		border: 1px solid var(--green02, #03d664);
		background: var(--green_01, #00f16f);
		color: var(--wh01, var(--wh, #fff));
		text-align: center;
		font-size: 13px;
		font-style: normal;
		font-weight: 700;
		line-height: 20px;
		letter-spacing: -0.5px;
	}
	& > div {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		span {
			color: var(--mint01, #5aeaae);
			font-size: 13px;
			font-style: normal;
			font-weight: 600;
			letter-spacing: -0.5px;
		}
	}
`;
