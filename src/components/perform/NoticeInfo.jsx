import React from "react";
import styled from "styled-components";

function NoticeInfo() {
	return (
		<Wrap>
			<h3 className="title">실시간 공지사항</h3>
			<div className="box">
				<span className="noti_type">운영공지</span>
				<p className="scrip">공연이 10분 지연될 예정입니다 ㅜㅜ</p>
				<span className="time">2시간전</span>
			</div>
		</Wrap>
	);
}

export default NoticeInfo;

const Wrap = styled.div`
	* {
		padding: 0;
		margin: 0;
	}
	width: 350px;
	.box {
		display: flex;
		padding-inline: 14px;
		padding-block: 16px;
		flex-direction: column;
		align-items: flex-start;
		border-radius: 15px;
		border: 1px solid #07fb77;
		background: var(--wh, #fff);
	}
	.noti_type {
		display: flex;
		width: 56px;
		padding: 2.692px 7px;
		justify-content: center;
		align-items: center;
		gap: 7.179px;
		border-radius: 5.385px;
		background: #07fb77;

		color: var(--wh01, var(--wh, #fff));
		font-size: 11px;
		font-weight: 700;
		line-height: 18px;
	}
	.scrip {
		color: #000;
		font-size: 12px;
		font-weight: 500;
		line-height: 20px;
		letter-spacing: -0.5px;
		margin-top: 6px;
	}
	.time {
		color: var(--gray05, #8e8e8e);
		text-align: right;
		font-size: 10px;
		font-weight: 600;
		line-height: 16px;
		letter-spacing: -0.407px;
		align-self: stretch;
	}

	.title {
		font-weight: 700;
		color: #000;
		font-size: 16px;
		line-height: 60px;
		margin: 0;
		padding-top: 8px;
		width: fit-content;
	}
`;
