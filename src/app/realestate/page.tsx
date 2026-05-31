import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Overview from "./components/Overview";
import HowItWorks from "./components/HowItWorks";
import WhoItsFor from "./components/WhoItsFor";
import Deliverables from "./components/Deliverables";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import TeamTraining from "./components/TeamTraining";
import Register from "./components/Register";

export default function RealEstatePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Overview />
        <HowItWorks />
        <WhoItsFor />
        <Deliverables />
        <Pricing />
        <FAQ />
        <TeamTraining />
        <Register />
      </main>
      <Footer />
    </>
  );
}
