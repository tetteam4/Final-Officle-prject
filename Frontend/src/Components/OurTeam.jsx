import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../Pages/styles.js";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../Utilities/motion.js";

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

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            variants={fadeIn("up", "spring", index * 0.5, 0.75)}
            className="bg-gradient-to-tr from-teal-700 to-blue-900 p-6 rounded-2xl shadow-card"
          >
            <img
              src={member.photo}
              alt={`${member.first_name} ${member.last_name}`}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-white text-[24px] font-bold mt-4">
              {member.first_name} {member.last_name}
            </h3>
            <p className="text-gray-300 text-[16px]">{member.designation}</p>
            <div className="flex mt-4 space-x-4">
              {member.whatsapp && (
                <a
                  href={member.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/path/to/whatsapp-icon.png"
                    alt="WhatsApp"
                    className="w-6 h-6"
                  />
                </a>
              )}
              {member.twitter_link && (
                <a
                  href={member.twitter_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/path/to/twitter-icon.png"
                    alt="Twitter"
                    className="w-6 h-6"
                  />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/path/to/linkedin-icon.png"
                    alt="LinkedIn"
                    className="w-6 h-6"
                  />
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/path/to/github-icon.png"
                    alt="GitHub"
                    className="w-6 h-6"
                  />
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
