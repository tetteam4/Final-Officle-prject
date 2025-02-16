import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const WebsiteDesign = () => {
  const [webModels, setWebModels] = useState([]);
  const [webCategories, setWebCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const cardsPerPage = 6;

  useEffect(() => {
    const fetchWebModels = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/webmodels/");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
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
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
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

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

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

  const totalWebModels = sortedWebModels.length;
  const totalPages = Math.ceil(totalWebModels / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = sortedWebModels.slice(indexOfFirstCard, indexOfLastCard);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };


  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleSortOrderChange = (e) => setSortOrder(e.target.value);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" },
  };

  const transition = { duration: 0.3, ease: "easeInOut" };
  const SkeletonLoader = () => (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg p-6 h-[400px]">
      <div className="h-48 w-full bg-gray-300 dark:bg-gray-600 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto mb-4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/6 mx-auto"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {[...Array(cardsPerPage)].map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500">
        Error loading data: {error.message}
      </div>
    );
  }


  return (

    <div className="p-8 min-h-screen">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-4 right-4 p-2 bg-purple-800 text-white rounded-full shadow-lg"
      >
        {darkMode ? "🌙" : "☀️"}
      </button>

      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Our Website Designs
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
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
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCards.map((webModel) => (
          <Link to={`/webmodels/${webModel.id}`} key={webModel.id}>
            <motion.div
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden cursor-pointer h-[400px]" // Removed p-6 and text-center
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={transition}
            >
              <div className="h-48 w-full overflow-hidden">
                {webModel.images && webModel.images.length > 0 ? (
                  <img
                    src={webModel.images[0].image} // Display first image
                    alt={webModel.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {webModel.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-400 h-[75px] overflow-hidden">
                  {webModel.description}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-purple-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default WebsiteDesign;