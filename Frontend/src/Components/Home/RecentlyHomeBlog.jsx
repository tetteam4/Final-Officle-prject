// RecentlyHomeBlog.js
import React, { useState, useEffect } from "react";
import Button from "../../Utilities/Button";
import { useNavigate } from "react-router-dom";
import { RxArrowRight } from "react-icons/rx";
import { FaUser } from "react-icons/fa";

const RecentlyHomeBlog = () => {
  const navigate = useNavigate();
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/blogs/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const sortedBlogs = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        const latest = sortedBlogs.slice(0, 3);
        setLatestBlogs(latest);
      } catch (error) {
        setError(error);
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  if (loading) {
    return <div>Loading latest articles...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="h-auto p-4 sm:p-5">
      {" "}
      {/* Adjusted padding */}
      <div className="text-center space-y-2 sm:space-y-4">
        {" "}
        {/* Adjusted spacing */}
        <p className="text-2xl sm:text-3xl font-semibold dark:text-gray-100">
          Articles & Events
        </p>{" "}
        {/* Dark mode text color */}
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
          {" "}
          {/* Dark mode text color */}
          The latest articles, insights, and events of TET (Tech Elevate Team)
        </p>
      </div>
      <div className="mt-6 sm:mt-10 w-full">
        {" "}
        {/* Adjusted margin */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {" "}
          {/* Adjusted grid and gap */}
          {latestBlogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 flex flex-col justify-between rounded-t-xl h-[450px] sm:h-[500px] w-full sm:w-[350px] shadow-xl ga"
            >
              {" "}
              {/* Dark mode background color */}
              {/* Image Section */}
              <div className="h-[150px] sm:h-[200px]">
                {" "}
                {/* Adjusted height */}
                <img
                  src={blog?.hero_image}
                  alt={blog?.title}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </div>
              {/* User & Date Section */}
              <div className="text-gray-600 dark:text-gray-300 flex gap-2 sm:gap-4 px-3 sm:px-4 items-center justify-between text-sm h-[40px] sm:h-[50px]">
                {" "}
                {/* Dark mode text color */}
                <div className="flex gap-x-1 sm:gap-x-2 items-center">
                  <div className="border rounded-full bg-gray-600 h-6 w-6 sm:h-8 sm:w-8 p-0.5 sm:p-1 flex justify-center items-center">
                    <FaUser size={16} sm:size={20} className="text-gray-50" />
                  </div>
                  <p className="text-md sm:text-lg font-bold">TET</p>
                </div>
              </div>
              {/* Title and Description Section */}
              <div className="px-3 sm:px-4 h-[120px] sm:h-[160px] overflow-hidden">
                {" "}
                {/* Adjusted height */}
                <h3 className="text-sm sm:text-md font-semibold h-[30px] sm:h-[40px] overflow-hidden text-ellipsis dark:text-gray-100">
                  {" "}
                  {/* Dark mode text color */}
                  {blog?.title}
                </h3>
                <p className="text-justify text-sm sm:text-md h-[80px] sm:h-[110px] mt-2 sm:mt-4 overflow-hidden text-ellipsis dark:text-gray-400">
                  {" "}
                  {/* Dark mode text color */}
                  {blog?.general_info?.length > 130
                    ? blog?.general_info.substring(0, 130) + "..."
                    : blog?.general_info}
                </p>
              </div>
              {/* Read More Button */}
              <div
                onClick={() => navigate(`/blog/${blog.id}`)}
                className="relative group cursor-pointer overflow-hidden h-[40px] sm:h-[50px]"
              >
                {/* Background animation effect */}
                <div className="absolute inset-0 w-0 bg-gradient-to-r from-[#02DB81] to-[#2d9469] transition-all duration-500 group-hover:w-full"></div>

                {/* Button Content */}
                <div className="relative py-2 sm:py-3 px-3 sm:px-4 flex items-center justify-between border z-10 transition-all duration-500 group-hover:text-white">
                  <span>Read Article</span>
                  <RxArrowRight size={20} sm:size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center max-w-7xl mx-auto mt-3 sm:mt-5 px-4 sm:px-10">
        {" "}
        {/* Adjusted margin and padding */}
        <Button text="Read More" onClick={() => navigate("/blog")} />
      </div>
    </div>
  );
};

export default RecentlyHomeBlog;
