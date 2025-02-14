import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaClock,
  FaArrowLeft,
  FaShare,
  FaBookmark,
} from "react-icons/fa";
import { SectionWrapper } from "../../hoc";
import BlogCategoryList from "../Blog/BlogCategoryList";
import SocialShare from "../Blog/SocialShare";
import LoadingSpinner from "./LoadingSpinner";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/blogs/${id}/`);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <div className="max-w-md bg-red-50 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Post
          </h2>
          <p className="text-red-700 mb-6">{error.message}</p>
          <button
            onClick={() => navigate("/blog")}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Return to Blog
          </button>
        </div>
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <div className="max-w-md bg-blue-50 p-6 rounded-xl">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">
            Post Not Found
          </h1>
          <button
            onClick={() => navigate("/blog")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Posts
          </button>
        </div>
      </div>
    );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      {/* Floating Navigation */}
      <div className="fixed top-4 left-4 right-4 flex justify-between z-50">
        <button
          onClick={() => navigate("/blog")}
          className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <FaArrowLeft className="text-xl text-gray-700 dark:text-gray-300" />
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setShowShare(!showShare)}
            className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <FaShare className="text-xl text-gray-700 dark:text-gray-300" />
          </button>
          <button className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <FaBookmark className="text-xl text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <SocialShare
        show={showShare}
        url={window.location.href}
        title={blog.title}
      />

      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerChildren}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Main Content */}
          <article className="flex-1">
            {/* Meta Section */}
            <motion.div variants={fadeIn} className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-2 bg-[#02DB81]/10 text-[#02DB81] rounded-full text-sm font-medium">
                  {blog.category.name}
                </span>
                <div className="flex items-center text-gray-500">
                  <FaClock className="mr-2" /> 5 min read
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {blog.title}
              </h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FaUser className="text-xl" />
                  <span className="font-medium">Tech Elevate Team</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              variants={fadeIn}
              className="relative w-full h-96 rounded-3xl overflow-hidden mb-12"
            >
              <img
                src={blog.hero_image}
                alt={blog.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30" />
            </motion.div>

            {/* General Info */}
            <motion.section
              variants={fadeIn}
              className="prose dark:prose-invert max-w-none mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <p className="text-xl leading-relaxed">{blog.general_info}</p>
            </motion.section>

            {/* Sections */}
            {blog.section.map((section, index) => (
              <motion.section
                key={section.id}
                variants={fadeIn}
                className={`mb-16 ${index % 2 === 0 ? "lg:pr-16" : "lg:pl-16"}`}
              >
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div
                    className={`lg:w-1/2 ${
                      index % 2 === 0 ? "order-1" : "order-2"
                    }`}
                  >
                    <h3 className="text-2xl font-bold mb-4">
                      {section.subtitle}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                  <div
                    className={`lg:w-1/2 ${
                      index % 2 === 0 ? "order-2" : "order-1"
                    }`}
                  >
                    <div className="relative rounded-2xl overflow-hidden aspect-video">
                      <img
                        src={section.image}
                        alt={section.subtitle}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </motion.section>
            ))}

            {/* Conclusion */}
            <motion.section
              variants={fadeIn}
              className="prose dark:prose-invert max-w-none mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">Key Takeaways</h2>
              <p className="text-xl leading-relaxed">{blog.conclusion}</p>
            </motion.section>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-80 xl:w-96">
            <BlogCategoryList />

            {/* Newsletter Form */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl mt-8">
              <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Subscribe to our newsletter for the latest insights
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
                />
                <button className="px-4 py-2 bg-[#02DB81] text-white rounded-lg hover:bg-[#02C572] transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </aside>
        </motion.div>
      </div>

      {/* Floating Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div
          className="h-full bg-[#02DB81] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </motion.div>
  );
};

export default SectionWrapper(BlogDetailsPage, "blog-details");
