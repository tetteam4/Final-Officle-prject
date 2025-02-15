import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

import { styles } from "../Pages/styles.js";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../Utilities/motion.js";
import styled from "styled-components";

const CustomVerticalTimeline = styled(VerticalTimeline)`
  &::before {
    background: ${(props) => props.theme.secondary};
  }
`;

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: "#0a7927",
      color: "#fff",
    }}
    contentArrowStyle={{ borderRight: "7px solid  #232631" }}
    date={new Date(experience.created_at).toLocaleDateString()}
    iconStyle={{ background: "#0a7927", color: "#fff" }} // Consistent background
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <img
          src={experience.image}
          alt={experience.company_name}
          className="w-[60px] h-[60px] object-cover rounded-full"
        />
      </div>
    }
  >
    <div>
      <h3 className="text-re text-[24px] font-bold">{experience.title}</h3>
      <p
        className="text-secondary text-[16px] font-semibold"
        style={{ margin: 0 }}
      >
        {experience.company_name}
      </p>
    </div>

    <ul className="mt-5 list-disc ml-5 space-y-2">
      {experience.points.split(",").map((point, index) => (
        <li
          key={`experience-point-${index}`}
          className="text-white-100 text-[14px] pl-1 tracking-wider"
        >
          {point.trim()}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const API_URL = "http://127.0.0.1:8000/api/experiences/";

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error("Could not fetch experiences:", error);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What we Work So far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Our Experinces.
        </h2>
      </motion.div>

      <div className=" mt-20 flex flex-col ">
        <CustomVerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </CustomVerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
