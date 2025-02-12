import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "../../Utilities/Button";
import { Navigate, useNavigate } from "react-router-dom";

const PortfolioHome = () => {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  
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
  }
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
      <h2 className="text-3xl font-bold text-center mb-8">
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
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative border-2 border-gray-200 p-1 rounded-lg shadow-2xl w-[400px] h-[300px] md:w-[650px] md:h-[400px]">
                  <img
                    src={project.images} // change and used from API
                    alt={project.name}
                    className="w-full h-full"
                  />
                </div>
                <div className="relative border-2 p-1 border-gray-200 rounded-lg shadow-lg w-[150px] h-[300px] md:w-[220px] md:h-[400px]">
                  <img
                    src={project.log_images} // change and used from API
                    alt={project.name}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination, Project Name, and View More Button in One Line */}
      <div className="grid grid-cols-3 place-content-center  items-center w-[80%] mx-auto px-5 mt-4">
        {/* Custom Pagination */}
        <div className="custom-pagination min-w-[100px]  flex gap-1"></div>

        {/* Project Name */}
        <div className="   px-4 py-2 text-center items-center flex gap-x-1.5">
          <span className="font-semibold text-lg">Project :</span>
          <span>{activeProject}</span>
        </div>

        {/* View More Button */}
        <div className="px-4 py-2  flex items-center justify-end">
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
