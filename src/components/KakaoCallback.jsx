// src/pages/KakaoCallback.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios"; // axios 인스턴스 import

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      // KakaoLogin API 요청
      const fetchToken = async () => {
        try {
          const response = await instance.get(
            `${process.env.REACT_APP_SERVER_PORT}/accounts/login/kakao/callback?code=${code}`
          );
          const access_token = response.data.token;
          localStorage.setItem("accessToken", access_token);
          navigate("/"); // 홈으로 리다이렉트
        } catch (error) {
          console.error(error);
          alert("카카오 토큰 반환에 실패했습니다.");
        }
      };

      fetchToken();
    } else {
      alert("코드를 찾을 수 없습니다.");
      navigate("/"); // 홈으로 리다이렉트
    }
  }, [navigate]);

  return <div>로그인 중...</div>; // 로딩 중 메시지
};

export default KakaoCallback;
