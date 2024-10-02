import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import GlobalStyle from "./style/GlobalStyle";
import "./style/normalize.css";

import AdminDetailPage from "./pages/performPages/AdminViewPage.jsx";
import BoothPage from "./pages/BoothPage.jsx";
import DetailPage from "./pages/performPages/DetailViewPage.jsx";
import EditViewPage from "./pages/performPages/EditViewPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MainPage from "./pages/MainPage";

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
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/detail/admin" element={<AdminDetailPage />} />
          <Route path="/detail/admin/edit" element={<EditViewPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
