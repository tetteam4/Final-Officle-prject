// navdata.jsx (or navdata.js)
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaPalette, FaServer, FaBullhorn } from "react-icons/fa";
import {
  FaMoneyBillWave,
  FaBuilding,
  FaTools,
  FaIndustry,
  FaPencilRuler,
} from "react-icons/fa";
import React, { useState, useEffect } from "react"; // Import React, useState, useEffect

export const useNavData = () => {
  // Changed NAV_DATA to a function to use hooks

  const [navData, setNavData] = useState([]); // State to store the fetched data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await fetch(
          "http://localhost:8000/api/services-category/"
        ); // Fetch categories
        if (!categoryResponse.ok) {
          throw new Error(`HTTP error! status: ${categoryResponse.status}`);
        }
        const categories = await categoryResponse.json();

        const servicesResponse = await fetch(
          "http://localhost:8000/api/services/"
        ); // Fetch services
        if (!servicesResponse.ok) {
          throw new Error(`HTTP error! status: ${servicesResponse.status}`);
        }
        const services = await servicesResponse.json();

        // Transform the data to match NAV_DATA structure
        const transformedNavData = [
          { name: "Home", path: "/", icon: null, subCategories: null },
          {
            name: "Website Design",
            path: "/webdesign",
            icon: (
              <MdKeyboardArrowDown
                size={24}
                className="transition-transform duration-300"
              />
            ), 
            
            subCategories: [
              {
                category: "Financial Websites Group",
                icon: <FaMoneyBillWave />, // Icon for financial websites
                items: [
                  {
                    name: "Currency Exchange Website Design",
                    path: "/currency-exchange-website-design",
                  },
                  {
                    name: "Investment Website Design",
                    path: "/investment-website-design",
                  },
                  {
                    name: "Nobitex Website Design",
                    path: "/nobitex-website-design",
                  },
                  {
                    name: "Insurance Website Design",
                    path: "/insurance-website-design",
                  },
                  { name: "Bank Website Design", path: "/bank-website-design" },
                  {
                    name: "Auction Website Design",
                    path: "/auction-website-design",
                  },
                ],
              },
              {
                category: "Business Websites Group",
                icon: <FaBuilding />, // Icon for business websites
                items: [
                  {
                    name: "E-commerce Website Design",
                    path: "/ecommerce-website-design",
                  },
                  {
                    name: "Jewelry Website Design",
                    path: "/jewelry-website-design",
                  },
                  {
                    name: "Real Estate Website Design",
                    path: "/real-estate-website-design",
                  },
                  {
                    name: "Travel Agency Website Design",
                    path: "/travel-agency-website-design",
                  },
                  {
                    name: "Educational Website Design",
                    path: "/educational-website-design",
                  },
                  {
                    name: "Legal Website Design",
                    path: "/legal-website-design",
                  },
                ],
              },
              {
                category: "Engineering Websites Group",
                icon: <FaTools />, // Icon for engineering websites
                items: [
                  {
                    name: "Corporate Website Design",
                    path: "/corporate-website-design",
                  },
                  {
                    name: "Industrial Website Design",
                    path: "/industrial-website-design",
                  },
                  {
                    name: "Engineering Website Design",
                    path: "/engineering-website-design",
                  },
                  {
                    name: "Automotive Website Design",
                    path: "/automotive-website-design",
                  },
                  {
                    name: "Construction Website Design",
                    path: "/construction-website-design",
                  },
                  {
                    name: "Oil and Gas Website Design",
                    path: "/oil-and-gas-website-design",
                  },
                ],
              },
              {
                category: "Artistic Websites Group",
                icon: <FaPencilRuler />, // Icon for artistic websites
                items: [
                  {
                    name: "Beauty Salon Website Design",
                    path: "/beauty-salon-website-design",
                  },
                  {
                    name: "Interior Design Website Design",
                    path: "/interior-design-website-design",
                  },
                  {
                    name: "Cosmetics Website Design",
                    path: "/cosmetics-website-design",
                  },
                  {
                    name: "Photography Website Design",
                    path: "/photography-website-design",
                  },
                  {
                    name: "Fashion Boutique Website Design",
                    path: "/fashion-boutique-website-design",
                  },
                  {
                    name: "Cinema Website Design",
                    path: "/cinema-website-design",
                  },
                ],
              },
              {
                category: "Medical Websites Group",
                icon: <FaIndustry />, // Icon for medical websites
                items: [
                  {
                    name: "Medical Website Design",
                    path: "/medical-website-design",
                  },
                  {
                    name: "Dental Website Design",
                    path: "/dental-website-design",
                  },
                  {
                    name: "Appointment Booking Website Design",
                    path: "/appointment-booking-website-design",
                  },
                  {
                    name: "Laboratory Website Design",
                    path: "/laboratory-website-design",
                  },
                  {
                    name: "Hospital Website Design",
                    path: "/hospital-website-design",
                  },
                ],
              },
            ],
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
              // Dynamically create subcategories
              category: category.title,
              icon: category.icon ? (
                <img
                  className="w-12 h-12"
                src={category.icon} alt={category.title} />
              ) : (
                <FaPalette />
              ), // Use image icon if available, else default
              items: services
                .filter((service) => service.category.id === category.id)
                .map((service) => ({
                  name: service.title, // Assuming 'description' is a suitable name
                  path: `/service/${service.id}`, // Create dynamic path
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
  }, []); // Empty dependency array means this runs only once on mount

  return { navData, loading, error }; // Return the state values
};
