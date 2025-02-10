import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryList from "../../Components/Portfolio/CategoryList";
import { FaUser } from "react-icons/fa";
import { SectionWrapper } from "../../hoc";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/blogs/${id}/`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return <div>Loading blog details...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!blog) {
    return (
      <div id="postdetails" className="text-center mt-10">
        <h1 className="text-2xl font-bold">No Blog Data Available</h1>
        <button
          onClick={() => navigate("/blog")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Left Aside - Category List */}
        <aside className="w-full md:w-1/4">
          <CategoryList />
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {blog.title}
            </h1>
            <div className="flex items-center mt-2 text-gray-600">
              {/* User Icon and Author */}
              <div className="flex items-center">
                <FaUser className="mr-2" />
                <span>TET</span>
              </div>
              {/* Date */}
            </div>
          </div>
          {/* Hero Image */}
          <div className="relative w-full h-96 rounded-md overflow-hidden mb-6">
            <img
              src={blog.hero_image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
          {/* General Information */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">Overview</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {blog.general_info}
            </p>
          </div>
          {/* Sections */}
          {blog.section.map((section) => (
            <div key={section.id} className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{section.subtitle}</h3>
              <div className="relative w-full h-80 rounded-md overflow-hidden mb-3">
                <img
                  src={section.image}
                  alt={section.subtitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {section.description}
              </p>
            </div>
          ))}
          {/* Conclusion */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Conclusion</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {blog.conclusion}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SectionWrapper(BlogDetailsPage, "blog-details");
