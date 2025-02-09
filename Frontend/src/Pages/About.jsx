import React from "react";
import Experience from "../Components/Experience.jsx";
import Tech from "../Components/Tech.jsx";
import Works from "../Components/Works.jsx";
import Abouts from "./Abouts.jsx";
import { SectionWrapper } from "../hoc/index.js";

const About = () => {
  return (
    <>
      <div>
        <Abouts />
        <Experience />
        <Tech />
        <Works />
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
