import React from "react";
import Experience from "../Components/Experience.jsx";
import Tech from "../Components/Tech.jsx";
import Works from "../Components/Works.jsx";
import Abouts from "./Abouts.jsx";
import { SectionWrapper } from "../hoc/index.js";
import OurTeam from "../Components/OurTeam.jsx";

const About = () => {
  return (
    <>
      <div>
        <Abouts />
        <OurTeam/> {/* Add the OurTeam component here */}
        <Experience />
        <Tech />
        <Works />
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
