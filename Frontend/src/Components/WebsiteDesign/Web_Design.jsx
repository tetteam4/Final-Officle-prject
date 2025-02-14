import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const WebsiteDesign = () => {
  const [webModels, setWebModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [webCategories, setWebCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  useEffect(() => {
    const fetchWebModels = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/webmodels/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWebModels(data);
      } catch (err) {
        setError(err);
      }
    };

    const fetchWebCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/webcategories/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWebCategories(data);
      } catch (err) {
        setError(err);
      }
    };

    setLoading(true);
    Promise.all([fetchWebModels(), fetchWebCategories()])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  const filteredWebModels = selectedCategory
    ? webModels.filter((model) => model.category.id === selectedCategory)
    : webModels;

  const sortedWebModels = [...filteredWebModels].sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;
    if (sortBy === "category") {
      return a.category.title.localeCompare(b.category.title) * order;
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name) * order;
    }
    return (a[sortBy] - b[sortBy]) * order;
  });

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Framer Motion Variants
  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" },
  };

  const transition = { duration: 0.3, ease: "easeInOut" };

  const totalWebModels = sortedWebModels.length;
  const totalPages = Math.ceil(totalWebModels / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = sortedWebModels.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 rounded-md ${
            currentPage === i
              ? "bg-purple-800 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  if (loading) {
    return <div>Loading website designs...</div>;
  }

  if (error) {
    return <div>Error loading website designs: {error.message}</div>;
  }

  return (
    <div className="dark:bg-purple-950 p-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Our Website Designs
      </h2>

      {/* Filtering and Sorting Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        {/* Category Filter */}
        <div className="mb-2 md:mb-0">
          <label
            htmlFor="category"
            className="mr-2 font-semibold text-gray-700 dark:text-gray-300"
          >
            Filter by Category:
          </label>
          <select
            id="category"
            className="border rounded px-2 py-1 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {webCategories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                className="text-gray-700 dark:text-gray-300"
              >
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting Options */}
        <div className="flex items-center">
          <label
            htmlFor="sort"
            className="mr-2 font-semibold text-gray-700 dark:text-gray-300"
          >
            Sort By:
          </label>
          <select
            id="sort"
            className="border rounded px-2 py-1 mr-2 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="id">ID</option>
            <option value="category">Category</option>
            <option value="name">Name</option>
          </select>
          <select
            id="sortOrder"
            className="border rounded px-2 py-1 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Website Design Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCards.map((webModel) => (
          <motion.div
            key={webModel.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-center cursor-pointer h-[400px]"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={transition}
          >
            <div className="text-4xl mb-4">
              {/* Display the category icon here if available */}
              {webModel.category.icon && (
                <img
                  src={webModel.category.icon}
                  alt={webModel.category.title}
                  style={{ maxWidth: "50px", maxHeight: "50px" }}
                />
              )}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {webModel.name}
            </h3>
            <p className="text-gray-700 dark:text-gray-400  h-[75px] overflow-hidden">
              {webModel.description}
            </p>
            {/* Add other data points here */}
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          {renderPaginationButtons()}
        </div>
      )}
    </div>
  );
};

export default WebsiteDesign;
