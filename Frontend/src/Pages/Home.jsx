// HomePage.js
import React from "react";
import Hero_Home from "../Components/HeroPage/Hero_Home";
import BeCreative from "../Components/Home/BeCreative";
import ProjectStats from "../Components/Home/ProjectStats";
import PortfolioHome from "../Components/Portfolio/PortfolioHome";
import RecentlyHomeBlog from "../Components/Home/RecentlyHomeBlog";
import CodeGenerationAnimation from "./CodeGenerationAnimation";

const HomePage = () => {
  return (
    <div className="font-sans">
      {" "}
      {/* Added dark mode background and text color */}
      <Hero_Home />
      <BeCreative />
      <CodeGenerationAnimation />
      <ProjectStats />
      <PortfolioHome />
      <RecentlyHomeBlog />
    </div>
  );
};

export default HomePage;
