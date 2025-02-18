import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCategories, setVisibleCategories] = useState(5);
  const [showAll, setShowAll] = useState(false);
  const [buttonText, setButtonText] = useState("See More");

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

  const handleToggleCategories = () => {
    if (showAll) {
      setVisibleCategories(5);
      setShowAll(false);
      setButtonText("See More");
    } else {
      setVisibleCategories(categories.length);
      setShowAll(true);
      setButtonText("See Less");
    }
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="">
      <ul>
        <li>
          <h1 className="text-lg font-bold py-2 dark:bg-gray-700 dark:text-white px-4">
            Categories
          </h1>
        </li>

        {categories.slice(0, visibleCategories).map((category) => (
          <li key={category.id} className="">
            <button
              onClick={() => navigate(`/portfolio/`)}
              className="w-full text-left flex items-center gap-x-1 border-b  dark:bg-gray-600 dark:text-gray-100 text-md font-medium cursor-pointer p-2 border-gray-300  hover:bg-white dark:hover:bg-white dark:hover:text-gray-700  text-gray-700  transition-all shadow-sm"
            >
              <span className="">
                <IoMdArrowDropright className="text-2xl text-green-500" />
              </span>
              <p className="">
                <span className="text-md">{category.name}</span>
              </p>
            </button>
          </li>
        ))}
      </ul>

      {categories.length > 5 && (
        <div className="flex justify-center mt-2 mb-2">
          <button
            onClick={handleToggleCategories}
            className="mt-2 text-green-400 hover:text-gray-100 "
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
