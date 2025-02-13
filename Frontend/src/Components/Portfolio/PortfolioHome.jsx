// PortfolioHome.js
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "../../Utilities/Button";
import { useNavigate } from "react-router-dom";

const PortfolioHome = () => {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/portfolios/"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
        if (data.length > 0) {
          setActiveProject(data[0].name); // Set initial active project
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleMore = (id) => {
    navigate(`/portfolio/${id}`);
  };

  const handleSlideChange = (swiper) => {
    setActiveProject(projects[swiper.realIndex].name);
  };

  if (loading) {
    return <div>Loading portfolio data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
        Our Website Design Portfolio
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        autoplay={{ delay: 3000 }}
        loop
        grabCursor={true}
        onSlideChange={handleSlideChange}
        className="w-full"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id} onClick={() => handleMore(project.id)}>
            <div className="flex flex-col items-center gap-4 sm:gap-8">
              <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-8">
                <div className="relative border-2 border-gray-200 dark:border-gray-700 p-1 rounded-lg shadow-2xl w-[300px] h-[200px] sm:w-[400px] sm:h-[300px] md:w-[600px] md:h-[400px]">
                  <img
                    src={project.images} // change and used from API
                    alt={project.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="relative border-2 border-gray-200 dark:border-gray-700 p-1 rounded-lg shadow-lg w-[100px] h-[200px] sm:w-[150px] sm:h-[300px] md:w-[200px] md:h-[400px]">
                  <img
                    src={project.log_images} // change and used from API
                    alt={project.name}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination, Project Name, and View More Button in One Line */}
      <div className="grid grid-cols-1 sm:grid-cols-3 place-content-center items-center w-[90%] mx-auto mt-4">
        {/* Custom Pagination */}
        <div className="custom-pagination min-w-[100px] flex gap-1 justify-center sm:justify-start"></div>

        {/* Project Name */}
        <div className="text-center py-2">
          <span className="font-semibold text-md sm:text-lg dark:text-gray-300">
            Project:
          </span>{" "}
          {/* Dark mode text color */}
          <span className="text-md sm:text-lg dark:text-gray-300">
            {activeProject}
          </span>{" "}
          {/* Dark mode text color */}
        </div>

        {/* View More Button */}
        <div className="flex items-center justify-center sm:justify-end py-2">
          <Button
            text="View More"
            onClick={() => navigate("/portfolio")} // Fixed navigate
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioHome;
