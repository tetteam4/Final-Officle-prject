import React, { useState, useEffect } from "react";
import TopPortfolioCard from "./TopPortfolioCard";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TopPortfolioList = ({ Portfolio_Data }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); 
  const [cardsPerPage, setCardsPerPage] = useState(4); 
  const [topProjects, setTopProjects] = useState([]);

  useEffect(() => {
    if (Portfolio_Data) {
      const filteredProjects = Portfolio_Data.filter(
        (project) => project.rating === "T" 
      );
      setTopProjects(filteredProjects);
    }
  }, [Portfolio_Data]);


  const totalPages = Math.ceil(topProjects.length / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = topProjects.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    for (let i = 1; i <= 2; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-2 py-1 text-xs rounded-md border border-gray-300 font-medium ${
            currentPage === i
              ? "bg-[#02DB81] text-white border-[#02DB81]"
              : "bg-white text-gray-700 hover:bg-gray-100"
          } transition-all shadow-md`}
        >
          {i}
        </button>
      );
    }

    if (currentPage > 4) {
      buttons.push(
        <button
          key="ellipsis-start"
          className="px-2 py-1 text-xs rounded-md border-gray-300 font-medium bg-white text-gray-700 cursor-default"
          disabled
        >
          ...
        </button>
      );
    }

    for (
      let i = Math.max(3, currentPage - 1);
      i <= Math.min(totalPages - 2, currentPage + 1);
      i++
    ) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-2 py-1 text-xs rounded-md border border-gray-300 font-medium ${
            currentPage === i
              ? "bg-[#02DB81] text-white border-[#02DB81]"
              : "bg-white text-gray-700 hover:bg-gray-100"
          } transition-all shadow-md`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 3) {
      buttons.push(
        <button
          key="ellipsis-end"
          className="px-2 py-1 text-xs rounded-md border-gray-300 font-medium bg-white text-gray-700 cursor-default"
          disabled
        >
          ...
        </button>
      );
    }

    for (let i = totalPages - 1; i <= totalPages; i++) {
      if (i > 2) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-2 py-1 text-xs rounded-md border border-gray-300 font-medium ${
              currentPage === i
                ? "bg-[#02DB81] text-white border-[#02DB81]"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } transition-all shadow-md`}
          >
            {i}
          </button>
        );
      }
    }

    return buttons;
  };

  return (
    <section className="max-w-7xl my-10 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Top Website Design Examples</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {currentCards.map((project) => (
          <TopPortfolioCard
            key={project.id}
            port={project}
            onClick={() =>
              navigate(`/portfolio/${project.id}`, {
                state: { port: project },
              })
            }
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-start items-center my-10 space-x-2">
          {/* Previous Button */}
          {currentPage > 1 && (
            <button
              onClick={handlePreviousPage}
              className="flex items-center px-3 text-sm py-1.5 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-[#02DB81] hover:text-white transition-all shadow-sm"
            >
              <FaChevronLeft className="mr-2" /> Previous
            </button>
          )}

          {/* Render Pagination Buttons */}
          {renderPaginationButtons()}

          {/* Next Button */}
          {currentPage < totalPages && (
            <button
              onClick={handleNextPage}
              className="flex items-center px-3 py-1.5 hover:bg-[#02DB81] rounded-md text-sm bg-white border border-gray-300 text-gray-700 hover:text-white transition-all shadow-sm"
            >
              Next <FaChevronRight className="ml-2" />
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default TopPortfolioList;
