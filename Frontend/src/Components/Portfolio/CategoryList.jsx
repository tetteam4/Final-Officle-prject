import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const CategoryList = () => {
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
          <h1 className="text-lg border-b font-bold py-2  px-4">Categories</h1>
        </li>
        {categories.map((category) => (
          <li key={category.id} className="">
            <button
              onClick={() => navigate(`/portfolio_ca/${category.name}`)}
              className="w-full text-left flex items-center gap-x-1    text-md font-medium cursor-pointer p-2 border-gray-300 hover:bg-white text-gray-700  transition-all shadow-sm"
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
    </div>
  );
};

export default CategoryList;