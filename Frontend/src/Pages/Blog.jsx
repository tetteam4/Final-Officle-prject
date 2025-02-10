import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../Components/Blog/BlogCard";
import BlogCategoryList from "../Components/Blog/BlogCategoryList";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import LoadingSpinner from "../Components/Blog/LoadingSpinner";
import BackToTopButton from "../Components/Blog/BackToTopButton";

const Blog = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cardsPerPage, setCardsPerPage] = useState(6);
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/blogs/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBlogData(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  // Filter blogData based on selectedCategory
  const filteredData =
    selectedCategory === "All"
      ? blogData
      : blogData.filter((blog) => blog.category.name === selectedCategory);

  const totalPages = Math.ceil(filteredData.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 text-sm rounded-md border font-medium ${
            currentPage === i
              ? "bg-[#02DB81] text-white border-[#02DB81]"
              : "bg-white text-gray-700 hover:bg-gray-100"
          } transition-all shadow-md`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-10">
        Error: {error.message}
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl py-8 px-4">
      <div className="flex flex-col md:flex-row gap-5 ">
        {/* Left Aside - Category List */}
        <aside className="w-full md:w-1/4">
          <BlogCategoryList
            onCategoryChange={handleCategoryChange}
            selectedCategory={selectedCategory}
          />
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4">
          <h1 className="text-3xl font-bold mb-6">Our Blog</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {currentCards.map((blog, index) => (
              <BlogCard
                key={index}
                blog={blog}
                onClick={() => navigate(`/blog/${blog.id}`)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center my-10 space-x-2">
              {/* Previous Button */}
              {currentPage > 1 && (
                <button
                  onClick={handlePreviousPage}
                  className="flex items-center px-3 py-1.5 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-[#02DB81] hover:text-white transition-all shadow-sm"
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
                  className="flex items-center px-3 py-1.5 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-[#02DB81] hover:text-white transition-all shadow-sm"
                >
                  Next <FaChevronRight className="ml-2" />
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default Blog;
