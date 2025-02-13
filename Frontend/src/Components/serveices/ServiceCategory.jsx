// components/ServiceCategory.js
import React, { useEffect, useState } from "react";
import { fetchServiceCategories } from "../utils/api";

const ServiceCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchServiceCategories().then((data) => setCategories(data));
  }, []);

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <img src={category.icon} alt={category.title} />
          <h3>{category.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default ServiceCategory;
