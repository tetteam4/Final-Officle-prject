import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";

const BlogCategoryList = ({ onCategoryChange, selectedCategory }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/categories/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    onCategoryChange(categoryName); // Notify Blog component of category change
    navigate(`/blog?category=${categoryName}`); // Navigate with category filter
  };

  if (loading) {
    return <div className="text-center py-4">Loading categories...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <ul>
        <li>
          <h1 className="text-lg border-b font-bold py-2 px-4">
            Blog Categories
          </h1>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => handleCategoryClick(category.name)}
              className={`w-full text-left flex items-center gap-x-1 text-md font-medium cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-all ${
                selectedCategory === category.name
                  ? "bg-[#02DB81] text-white hover:bg-[#02DB81]"
                  : "text-gray-700"
              }`}
            >
              <span>
                <IoMdArrowDropright
                  className={`text-2xl ${
                    selectedCategory === category.name
                      ? "text-white"
                      : "text-green-500"
                  }`}
                />
              </span>
              <p>{category.name}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogCategoryList;
