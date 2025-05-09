import ChallongeTest from "../components/ChallongeTest";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import MatchesSection from "../components/MatchesSection";
import PrizeItem from "../components/PrizeItem";
import Rules from "../components/Rules";
import useGetMatchData from "../hooks/useGetMatchData";

const Home = () => {
  useGetMatchData()
  return (
    <Layout>
      <Hero />
      <PrizeItem />
      <Rules />
      <MatchesSection round={'1'}/>
      <MatchesSection round={'2'}/>
      <MatchesSection round={'3'}/>
    </Layout>
  );
};

export default Home;
