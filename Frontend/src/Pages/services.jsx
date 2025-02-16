import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../Components/serveices/sevicew.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [sortBy, setSortBy] = useState("pkid");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/services/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/services-category/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err);
      }
    };

    setLoading(true);
    Promise.all([fetchServices(), fetchCategories()])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  const filteredServices = selectedCategory
    ? services.filter((service) => service.category.id === selectedCategory)
    : services;

  const sortedServices = [...filteredServices].sort((a, b) => {
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

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" },
  };

  const transition = { duration: 0.3, ease: "easeInOut" };

  const totalServices = sortedServices.length;
  const totalPages = Math.ceil(totalServices / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = sortedServices.slice(indexOfFirstCard, indexOfLastCard);

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
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div>Error loading services: {error.message}</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Our Services
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
            {categories.map((category) => (
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

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentCards.map((service) => (
          <Link
            to={`/services/${service.id}`}
            key={service.id}
            className="block"
          >
            <motion.div
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg cursor-pointer overflow-hidden" // Removed p-6 and text-center
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={transition}
            >
              <div className="h-48 overflow-hidden">
                {" "}
                {/* Image Container */}
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-4">
                {" "}
                {/* Content Container */}
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {service.name}
                </h3>
                <p className=" text-gray-700 dark:text-gray-400 h-20 overflow-hidden ">
                  {service.description}
                </p>
                <div className="buttons mt-4">
                  <button className="btn">
                    <span></span>
                    <p
                      data-start="start"
                      data-text="Start!"
                      data-title="Read More"
                    ></p>
                  </button>
                </div>
              </div>
            </motion.div>
          </Link>
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

export default Services;
