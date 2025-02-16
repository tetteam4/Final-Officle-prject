import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaSort,
  FaClock,
} from "react-icons/fa";
import "../Components/Blog/css.css"
import LoadingSpinner from "../Components/Blog/LoadingSpinner";
import NesCard from "../Components/Blog/NesCard";

// // BlogCard Component
// const BlogCard = ({ blog, onClick, className }) => (
//   <div
//     className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer group ${className}`}
//     onClick={onClick}
//   >
//     <div className="relative h-48 overflow-hidden">
//       <img
//         src={blog.hero_image}
//         alt={blog.title}
//         className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//     </div>

//     <div className="p-6">
//       <div className="flex items-center gap-3 mb-4">
//         <span className="px-3 py-1 bg-[#02DB81]/10 text-[#02DB81] rounded-full text-sm font-medium">
//           {blog.category.name}
//         </span>
//         <div className="flex items-center text-gray-500 text-sm">
//           <FaClock className="mr-1" /> {blog.read_time} min read
//         </div>
//       </div>

//       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
//         {blog.title}
//       </h3>
//       <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
//         {blog.description}
//       </p>

//       <div className="flex items-center text-[#02DB81] font-medium">
//         Read Article
//         <FaChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
//       </div>
//     </div>
//   </div>
// );

// Main Blog Component
const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/blogs/");
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategoriesData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/categories/");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchBlogData();
    fetchCategoriesData();
  }, []);

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category.name === selectedCategory);

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;
    if (sortBy === "category")
      return a.category.name.localeCompare(b.category.name) * order;
    if (sortBy === "title") return a.title.localeCompare(b.title) * order;
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedBlogs.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = sortedBlogs.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousPage = () =>
    currentPage > 1 && handlePageChange(currentPage - 1);
  const handleNextPage = () =>
    currentPage < totalPages && handlePageChange(currentPage + 1);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <section className="min-h-screen ">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Insights
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover expert perspectives and stay updated with industry trends
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                <FaFilter className="text-[#02DB81]" />
                <span className="font-medium">Category</span>
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 
                         bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#02DB81] transition-all"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div className="flex-1">
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                <FaSort className="text-[#02DB81]" />
                <span className="font-medium">Sort By</span>
              </label>
              <div className="flex gap-2">
                <select
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 
                           bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#02DB81] transition-all"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="title">Title</option>
                  <option value="category">Category</option>
                </select>
                <select
                  className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 
                           bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#02DB81] transition-all"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {currentCards.map((blog) => (
            <NesCard
              key={blog.id}
              blog={blog}
              onClick={() => navigate(`/blog/${blog.id}`)}
              className="transform transition-transform duration-300 hover:scale-[1.02]"
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-gray-600 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-[#02DB81] 
                           hover:text-white disabled:opacity-50 disabled:hover:bg-gray-100 transition-all"
                >
                  <FaChevronLeft />
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => {
                    const page = i + 1;
                    const isCurrent = page === currentPage;
                    const showPage =
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1;

                    return showPage ? (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          isCurrent
                            ? "bg-gradient-to-br from-[#02DB81] to-emerald-500 text-white shadow-lg"
                            : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                        } transition-all`}
                      >
                        {page}
                      </button>
                    ) : page === 2 || page === totalPages - 1 ? (
                      <span key={page} className="px-4 py-2">
                        ...
                      </span>
                    ) : null;
                  })}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-[#02DB81] 
                           hover:text-white disabled:opacity-50 disabled:hover:bg-gray-100 transition-all"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
