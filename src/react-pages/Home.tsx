
import Header from "../components/Header";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import MatchCardGS from "../components/MatchCardGS";
import PrizeItem from "../components/PrizeItem";


const Home = () => {
  return (
    <Layout>
      <Hero />
      <PrizeItem />
      <PrizeItem />
    </Layout>
  );
};
export default Home;