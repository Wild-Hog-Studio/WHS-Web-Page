import LeagueSubscriptionBanner from "../components/LeagueSubscriptionBanner";
import Layout from "../components/Layout";

const bannerConfig = {
  mainTitle: "LIGA WILDHOG MAYO",
  subTitle: "Inicio 05 de Mayo",
  btnTitle: "INSCRIBIRSE",
  onBtnPress: () => console.log("pressed"),
};

const TCG = () => {
  return (
    <Layout>
      <LeagueSubscriptionBanner bannerConfig={bannerConfig} />
    </Layout>
  );
};

export default TCG;
