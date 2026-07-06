import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ToolsBar from "./components/ToolsBar";
import Problem from "./components/Problem";
import Training from "./components/Training";
import Overview from "./components/Overview";
import HowItWorks from "./components/HowItWorks";
import Curriculum from "./components/Curriculum";
import WhoItsFor from "./components/WhoItsFor";
import Deliverables from "./components/Deliverables";
import ValueStack from "./components/ValueStack";
import Pricing from "./components/Pricing";
import Guarantee from "./components/Guarantee";
import FAQ from "./components/FAQ";
import TeamTraining from "./components/TeamTraining";
import Register from "./components/Register";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ToolsBar />
        <Problem />
        <Training />
        <Overview />
        <HowItWorks />
        <Curriculum />
        <WhoItsFor />
        <Deliverables />
        <ValueStack />
        <Pricing />
        <Guarantee />
        <FAQ />
        <TeamTraining />
        <Register />
      </main>
      <Footer />
    </>
  );
}
