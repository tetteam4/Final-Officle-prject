// ProjectStats.js
import React, { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";

const ProjectStats = () => {
  const stats = {
    successfulProjects: 70,
    suggestedProjects: 25,
    upcomingProjects: 100,
  };

  const [successfulProjects, setSuccessfulProjects] = useState(0);
  const [suggestedProjects, setSuggestedProjects] = useState(0);
  const [upcomingProjects, setUpcomingProjects] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const sectionRef = useRef(null);

  const animateCounter = (target, setter) => {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.ceil(target / 50);
      if (count >= target) {
        clearInterval(interval);
        setter(target);
      } else {
        setter(count);
      }
    }, 20);
  };

  const handleScroll = () => {
    if (!hasAnimated) {
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight - 100) {
        setHasAnimated(true);
        animateCounter(stats.successfulProjects, setSuccessfulProjects);
        animateCounter(stats.suggestedProjects, setSuggestedProjects);
        animateCounter(stats.upcomingProjects, setUpcomingProjects);
      }
    }
  };

  useEffect(() => {
    handleScroll(); // Trigger animation on initial load
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasAnimated]);

  return (
    <div
      ref={sectionRef}
      className="py-6 px-4 sm:py-8 sm:px-6 relative mx-auto mt-12 sm:mt-20"
    >

      <div className="grid grid-cols-1 md:grid-cols-3 border-b py-4 border-t justify-center lg:grid-cols-3 gap-5 sm:gap-10 lg:gap-4 md:gap-1">

        <div className="relative md:border-l text-center content-center space-y-2">
          <p className="mt-4 sm:mt-5 font-bold flex items-center justify-center text-green-500">
            <span className="ml-2">
              <FaPlus />
            </span>
            <span className="text-4xl sm:text-5xl md:text-6xl">
              {successfulProjects}
            </span>{" "}
        
          </p>
          <p className="text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-300">
            successfulProjects
          </p>{" "}
   
        </div>
   
        <div className="relative p-4 content-center border-t md:border-none text-center space-y-2">
          <p className="font-bold flex items-center justify-center text-[#0acd81] mt-4 sm:mt-5">
            <span className="ml-2">
              <FaPlus />
            </span>
            <span className="text-4xl sm:text-5xl md:text-6xl">
              {suggestedProjects}
            </span>{" "}
    
          </p>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300">
            suggestedProjects
          </p>{" "}
       
        </div>
        <div className="relative border-t md:border-t-0 md:border-r p-4 flex justify-center text-center space-y-4">
          <div className="flex justify-around gap-x-4 sm:gap-x-8 items-center mt-4 sm:mt-6">
            {" "}
   
            <div>
              <p className="font-bold flex items-center justify-center text-[#0acd81]">
                <span className="ml-2">
                  <FaPlus />
                </span>
                <span className="text-4xl sm:text-5xl md:text-6xl">
                  {upcomingProjects}
                </span>{" "}
              </p>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300">
                Upcoming Projects
              </p>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStats;
