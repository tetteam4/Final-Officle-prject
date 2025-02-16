// src/theme.js
export const lightTheme = {
  body: "#FFFFFF",
  text: "#363537",
  toggleBorder: "#FFF",
  background: "#363537",
  primary: "#02DB81",
  secondary: "#2d9469",
};

export const darkTheme = {
  body: "#363537",
  text: "#FAFAFA",
  toggleBorder: "#6B8096",
  background: "#999",
  primary: "#2d9469",
  secondary: "#02DB81",
};

// navdata.jsx (or navdata.js)
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaPalette, FaServer, FaBullhorn } from "react-icons/fa";
import React, { useState, useEffect } from "react";

export const useNavData = () => {
  const [navData, setNavData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Services Categories and Services (Existing)
        const categoryResponse = await fetch(
          "http://localhost:8000/api/services-category/"
        );
        if (!categoryResponse.ok)
          throw new Error(`HTTP error! status: ${categoryResponse.status}`);
        const categories = await categoryResponse.json();

        const servicesResponse = await fetch(
          "http://localhost:8000/api/services/"
        );
        if (!servicesResponse.ok)
          throw new Error(`HTTP error! status: ${servicesResponse.status}`);
        const services = await servicesResponse.json();

        // Fetch Web Categories and Web Models (NEW)
        const webCategoryResponse = await fetch(
          "http://localhost:8000/api/webcategories/"
        );
        if (!webCategoryResponse.ok)
          throw new Error(`HTTP error! status: ${webCategoryResponse.status}`);
        const webCategories = await webCategoryResponse.json();

        const webModelsResponse = await fetch(
          "http://localhost:8000/api/webmodels/"
        );
        if (!webModelsResponse.ok)
          throw new Error(`HTTP error! status: ${webModelsResponse.status}`);
        const webModels = await webModelsResponse.json();

        // Transform the data to match NAV_DATA structure
        const transformedNavData = [
          { name: "Home", path: "/", icon: null, subCategories: null },
          {
            name: "Website Design",
            path: "/website-design",
            icon: (
              <MdKeyboardArrowDown
                size={24}
                className="transition-transform duration-300"
              />
            ),
            subCategories: webCategories.map((webCategory) => ({
              category: webCategory.title,
              icon: webCategory.icon ? (
                <img src={webCategory.icon} alt={webCategory.title} />
              ) : (
                <FaPalette />
              ),
              items: webModels
                .filter((webModel) => webModel.category.id === webCategory.id)
                .map((webModel) => ({
                  name: webModel.name, // Assuming 'name' is a suitable name
                  path: `/webmodels/${webModel.id}`, // Create dynamic path
                })),
            })),
          },
          { name: "Portfolio", path: "/portfolio" },
          {
            name: "Services",
            path: "/services",
            icon: (
              <MdKeyboardArrowDown
                size={24}
                className="transition-transform duration-300"
              />
            ),
            subCategories: categories.map((category) => ({
              category: category.title,
              icon: category.icon ? category.icon : <FaPalette />, 
              items: services
                .filter((service) => service.category.id === category.id)
                .map((service) => ({
                  name: service.name,
                  path: `/services/${service.pkid}`,
                })),
            })),
          },

          { name: "Blog", path: "/blog", icon: null, subCategories: null },
          { name: "About Us", path: "/about", icon: null, subCategories: null },
          {
            name: "Contact",
            path: "/contact",
            icon: null,
            subCategories: null,
          },
        ];

        setNavData(transformedNavData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { navData, loading, error };
};
