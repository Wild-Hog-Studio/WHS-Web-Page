import ChallongeTest from "../components/ChallongeTest";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import MatchesSection from "../components/MatchesSection";
import PrizeItem from "../components/PrizeItem";
import Rules from "../components/Rules";
import useGetMatchData from "../hooks/useGetMatchData";

const Home = () => {
  useGetMatchData(); // Hook que carga participantes y matches

  return (
    <Layout>
      <Hero />
      <PrizeItem />
      <Rules />
      <MatchesSection /> {/* Una sola invocación para todas las rondas */}
      <ChallongeTest />
    </Layout>
  );
};

export default Home;
