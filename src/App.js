import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import GlobalStyle from "./style/GlobalStyle";
import "./style/normalize.css";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage.jsx";
import BoothPage from "./pages/BoothPage.jsx";
import BoothDetailPage from "./pages/BoothDetail/BoothDetailPage.jsx";
import BoothEditPage from "./pages/BoothEdit/BoothEditPage.jsx";
import Footer from "./components/Footer";

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
          <Route path="/" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/booth" element={<BoothPage />} />
          <Route path="/booth-edit" element={<BoothEditPage />} />
          <Route path="/booth-detail" element={<BoothDetailPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
