import React, { useState, useEffect } from "react";
import MainPage from "./MainPage";
import BoothMainPage from "./BoothMainPage";
import ShowMainPage from "./ShowMainPage";
import TFMainPage from "./TFMainPage";
import Popup from "./Popup";

const DefineType = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const popupClosed = localStorage.getItem("popupClosed");
    const today = new Date().toDateString();

    if (popupClosed !== today) {
      setIsPopupOpen(true);
    }
  }, []);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const userType = localStorage.getItem("type");

  const renderPageContent = () => {
    switch (userType) {
      case "admin":
        return <BoothMainPage />;
      case "show":
        return <ShowMainPage />;
      case "tf":
        return <TFMainPage />;
      default:
        return <MainPage />;
    }
  };

  return (
    <>
      {renderPageContent()}
      {isPopupOpen && <Popup onClose={closePopup} />}
    </>
  );
};

export default DefineType;
