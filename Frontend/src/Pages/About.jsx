import React from "react";
import Experience from "../Components/Experience.jsx";
import Tech from "../Components/Tech.jsx";
// import Works from "../Components/Works.jsx";
import Abouts from "./Abouts.jsx";
import { SectionWrapper } from "../hoc/index.js";
import OurTeam from "../Components/OurTeam.jsx";
import TopPortfolioList from "../Components/Portfolio/TopPortfolioList.jsx";

const About = () => {
  return (
    <>
      <div>
        <Abouts />
        <OurTeam /> 
        <Experience />
        <Tech />
        <TopPortfolioList />
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
