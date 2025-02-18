import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const ProjectNameList = ({ Portfolio_Data }) => {
  const navigate = useNavigate();
  const [visibleProjects, setVisibleProjects] = useState(5);
  const [showAll, setShowAll] = useState(false);
  const [buttonText, setButtonText] = useState("See More");

  const handleToggleProjects = () => {
    if (showAll) {
      setVisibleProjects(5);
      setShowAll(false);
      setButtonText("See More");
    } else {
      setVisibleProjects(Portfolio_Data.length);
      setShowAll(true);
      setButtonText("See Less");
    }
  };

  const displayedProjects = Portfolio_Data.slice(0, visibleProjects);

  return (
    <div>
      <ul className="">
        <li>
          <h1 className="text-lg border-b font-bold py-2  px-4">Projects</h1>
        </li>
        {displayedProjects.map((port, index) => (
          <li
            key={index}
            onClick={() =>
              navigate(`/portfolio/${port.id}`, {
                state: { port: port },
              })
            }
            className="w-full text-left flex items-center gap-x-1 border-b  dark:bg-gray-600 dark:text-gray-100 text-md font-medium cursor-pointer p-2 border-gray-300  hover:bg-white dark:hover:bg-white dark:hover:text-gray-700  text-gray-700  transition-all shadow-sm"
          >
            <span className="">
              <IoMdArrowDropright className="text-2xl text-green-500" />
            </span>
            <p className="">
              <span className="text-md">{port.name}</span>
            </p>
          </li>
        ))}
      </ul>
      {Portfolio_Data.length > 5 && (
        <div className="flex justify-center  mt-2 mb-2">
          <button
            onClick={handleToggleProjects}
            className="mt-2 text-green-400 hover:text-gray-100 "
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectNameList;
