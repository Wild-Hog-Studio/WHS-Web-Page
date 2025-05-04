import React from "react";
import Header from "../components/Header";
import LeagueSubscriptionBanner from "../components/LeagueSubscriptionBanner";

const Main = () => {
  return (
    <>
      <Header />
      <LeagueSubscriptionBanner
        bannerConfig={{
          mainTitle: "LIGA WILDHOG MAYO",
          subTitle: "Inicio 05 de mayo",
          btnTitle: "INSCRIBIRSE",
          onBtnPress: () => console.log("test"),
        }}
      />
    </>
  );
};

export default Main;
