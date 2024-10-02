import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import GlobalStyle from "./style/GlobalStyle";
import "./style/normalize.css";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage.jsx";
import BoothPage from "./pages/BoothPage.jsx";
<<<<<<< HEAD
import BoothDetailPage from "./pages/BoothDetail/BoothDetailPage.jsx";
import BoothEditPage from "./pages/BoothEdit/BoothEditPage.jsx";
=======

>>>>>>> c1307fc158bfcfa68d2c91ba971f31e5719ff17c
import Footer from "./components/Footer";
import SignupPage from "./pages/SignupPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import NoticeListPage from "./pages/TF/NoticeListPage.jsx";
import NoticeCreatePage from "./pages/TF/NoticeCreatePage.jsx";
import NoticeDetailPage from "./pages/TF/NoticeDetailPage.jsx";
import FestivalIntro from "./pages/FestivalIntro.jsx";
import BarrierFreeInfo from "./pages/BarrierFreeInfo.jsx";
import ShowPage from "./pages/ShowPage.jsx";


function App() {
  // 뷰포트 높이 계산
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/booth" element={<BoothPage />} />
<<<<<<< HEAD
          <Route path="/booth-edit" element={<BoothEditPage />} />
          <Route path="/booth-detail" element={<BoothDetailPage />} />
=======
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/NoticeList" element={<NoticeListPage />} />
          <Route path="/NoticeCreate" element={<NoticeCreatePage />} />
          <Route path="/NoticeDetail" element={<NoticeDetailPage />} />
          <Route path="/FestivalIntro" element={<FestivalIntro />} />
          <Route path="/BarrierFree" element={<BarrierFreeInfo />} />
          <Route path="/show" element={<ShowPage />} />
>>>>>>> c1307fc158bfcfa68d2c91ba971f31e5719ff17c
        </Routes>
      </Router>
    </>
  );
}

export default App;
