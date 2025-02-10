import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryList from "../Components/Portfolio/CategoryList";
import PortfolioCard from "../Components/Portfolio/PortfolioCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PortFolioSliderHero from "../Components/Portfolio/PortFolioSliderHero";
import ProjectNameList from "../Components/Portfolio/ProjectNameList";
import PortfolioFiltering from "../Components/Portfolio/PortfolioFiltering";
import LatestPortfolioWork from "../Components/Portfolio/LatestPortfolioWork";
import TopPortfolioList from "../Components/Portfolio/TopPortfolioList";

const Portfolio = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cardsPerPage, setCardsPerPage] = useState(6);
  const [portfolioData, setPortfolioData] = useState([]); // State for portfolio data from API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSort, setSelectedSort] = useState("A-Z");

  useEffect(() => {
    const fetchPortfolioData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/portfolios/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPortfolioData(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  // Filter portfolioData based on selectedCategory
  const filteredData =
    selectedCategory === "All"
      ? portfolioData
      : portfolioData.filter(
          (project) => project.category.name === selectedCategory //access category.name
        );

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };
  const sortedData = [...filteredData].sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (selectedSort === "A-Z") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  const totalPages = Math.ceil(sortedData.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = sortedData.slice(indexOfFirstCard, indexOfLastCard);

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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
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
          className="px-2 py-1 text-xs rounded-md  border-gray-300  font-medium bg-white text-gray-700 cursor-default"
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
          className={`px-2 py-1 text-xs rounded-md border border-gray-300  font-medium ${
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
          className="px-2 py-1 text-xs rounded-md  border-gray-300  font-medium bg-white text-gray-700 cursor-default"
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
            className={`px-2 py-1 text-xs rounded-md border  border-gray-300  font-medium ${
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

  if (loading) {
    return <div>Loading portfolio data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="mx-auto  max-w-7xl ">
      <div className="py-4">
        <h1 className="text-2xl font-bold">Our Works</h1>
      </div>
      <div className="grid grid-cols-4 max-w-7xl mx-auto h-auto items-start gap-x-3">
        <aside className="col-span-1 border h-auto bg-green-100/95 min-h-0 overflow-auto">
          <CategoryList />
        </aside>

        {/* Middle Section - Portfolio Slider Hero */}
        <div className="col-span-2 border h-[300px] min-h-0 overflow-auto">
          <PortFolioSliderHero Portfolio_Data={portfolioData} />
        </div>

        <aside className="col-span-1 border h-auto bg-green-100/95 min-h-0 overflow-auto">
          <ProjectNameList Portfolio_Data={portfolioData} />
        </aside>
      </div>
      <div>
        <PortfolioFiltering
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          Portfolio_Data={portfolioData} // Pass portfolioData as a prop
          onSortChange={handleSortChange}
        />
      </div>
      {/* Portfolio Card */}
      <div className="grid grid-cols-3 max-w-7xl gap-5 mt-10 mx-auto">
        {currentCards.map((port, index) => {
          const handleClick = () => {
            console.log(`here: ${port.id}`);
            console.log(`here 2: ${port.name}`);
            navigate(`/portfolio/${port.id}`, {
              state: { port: port },
            });
          };

          return (
            <PortfolioCard
              key={index}
              port={port}
              onClick={handleClick} // Use the handleClick function
            />
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-start items-center my-10 space-x-2">
          {currentPage > 1 && (
            <button
              onClick={handlePreviousPage}
              className="flex items-center px-3 text-sm py-1.5 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-[#02DB81] hover:text-white transition-all shadow-sm"
            >
              <FaChevronLeft className="mr-2" /> Previous
            </button>
          )}

          {renderPaginationButtons()}

          {currentPage < totalPages && (
            <button
              onClick={handleNextPage}
              className="flex items-center px-3 py-1.5 hover:bg-[#02DB81] rounded-md text-sm bg-white border border-gray-300 text-gray-700 hover:text-white transition-all shadow-sm"
            >
              Next <FaChevronRight className="ml-2 " />
            </button>
          )}
        </div>
      )}

      <div className="mt-10">
        <LatestPortfolioWork Portfolio_Data={portfolioData} />
      </div>
      <div className="mt-10">
        <TopPortfolioList Portfolio_Data={portfolioData} />
      </div>
    </section>
  );
};

export default Portfolio;
