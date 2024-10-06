import React from "react";
import MainPage from "./MainPage";
import BoothMainPage from "./BoothMainPage";
import ShowMainPage from "./ShowMainPage";
import TFMainPage from "./TFMainPage";

const DefineType = () => {
  const userType = localStorage.getItem("type");

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

export default DefineType;
