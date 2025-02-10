import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../Pages/styles.js";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Utilities/motion.js";

// Import icons (you can use react-icons or custom SVG icons)
import { FaWhatsapp, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const OurTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/teams/");
        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Meet Our Team</p>
        <h2 className={styles.sectionHeadText}>Our Team.</h2>
      </motion.div>

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            variants={fadeIn("up", "spring", index * 0.5, 0.75)}
            className="relative flex flex-col rounded-xl bg-gray-100 bg-clip-border text-gray-700 shadow-md w-full max-w-xs mx-auto"
          >
            <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
              <img
                src={member.photo}
                alt={`${member.first_name} ${member.last_name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                {member.first_name} {member.last_name}
              </h5>
              <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                {member.designation}
              </p>
            </div>
            <div className="p-6 pt-0 flex justify-center space-x-4">
              {member.whatsapp && (
                <a
                  href={member.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                >
                  <FaWhatsapp className="w-6 h-6" />
                </a>
              )}
              {member.twitter_link && (
                <a
                  href={member.twitter_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(OurTeam, "team");
