import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Overview from "./components/Overview";
import HowItWorks from "./components/HowItWorks";
import WhoItsFor from "./components/WhoItsFor";
import Deliverables from "./components/Deliverables";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Register from "./components/Register";
import Footer from "./components/Footer";

export default function Home() {
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
        <Register />
      </main>
      <Footer />
    </>
  );
}
