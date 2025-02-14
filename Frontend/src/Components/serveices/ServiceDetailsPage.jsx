import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import Link
import Breadcrumb from "../Portfolio/Breadcrumb";
// import CategoryList from "./CategoryList";
// import RelatedCategoryPortfolio from "./RelatedCategoryPortfolio";
import { MdDashboard, MdRoomService, MdSettings } from "react-icons/md";

const ServiceDetailsPage = () => {
  const { pkid } = useParams(); // Use id instead of slug
  const navigate = useNavigate();
  const [service, setService] = useState(null); // Changed portfolio to service
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/api/services/${pkid}/` // Use the service ID
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setService(data); // Changed setPortfolio to setService
      } catch (error) {
        setError(error);
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
    window.scrollTo(0, 0); //scroll to top
  }, [pkid]);

  if (loading) {
    return <div>Loading service details...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!service) {
    return (
      <div id="servicedetails" className="text-center mt-10">
        <h1 className="text-2xl font-bold">No Service Data Available</h1>
        <button
          onClick={() => navigate("/services")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back to Services
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Breadcrumb />
      <div className="flex flex-col md:flex-row gap-5">
        <div className="lg:w-[25%] border bg-green-100/95 h-full">
          {/* <CategoryList /> */}
        </div>
        <div className="md:w-[75%] lg:w-[75%]  w-full h-fit mt-5 p-2  rounded-md">
          <div className="h-auto ">
            <h1 className="text-2xl font-extrabold mb-5 text-gray-900 dark:text-white ">
              {service.name} {/* Changed portfolio.name to service.name */}
            </h1>
          </div>
          <div className="">
            <p className="text-justify text-gray-600 text-base">
              {service.description} {/* Changed portfolio.description to service.description */}
            </p>
            <p className="text-gray-600">
              For more information about
              <span className="font-bold text-green-600">
                {service.category.title} {/* Changed portfolio.category.name to service.category.title */}
              </span>
              , contact Tech Elevate Team consultants.
            </p>
            <p className="mt-5 text-black font-semibold">
              In the image below, you can see the overall layout of the
              {service.name} {/* Changed portfolio.name to service.name */} and the elements used in its design.
            </p>
          </div>
          <div className="w-full flex justify-center items-center my-10">
          <a href={service.video} target="_blank" rel="noopener noreferrer">
            <button className="cursor-pointer font-semibold rounded-md overflow-hidden relative z-100 border border-green-500 group px-4 py-2">
              <span className="relative z-10 text-green-500 group-hover:text-white text-md duration-300">
                View Video
              </span>
              <span className="absolute w-full h-full bg-[#02DB81] -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
              <span className="absolute w-full h-full bg-[#02DB81]  -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
            </button>
          </a>
          </div>
          <div className="relative w-full mt-3 h-[300px] md:h-[300px]  lg:h-[400px] rounded-md overflow-hidden mb-6">
            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative border rounded-md border-gray-200   shadow-2xl w-[400px] h-[300px] md:w-[650px] md:h-[400px]">
                  <img
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full rounded-md"
                  />
                </div>
                <div className="relative border border-gray-200 rounded-md shadow-lg w-[150px] h-[300px] md:w-[250px] md:h-[400px]">
                  <img
                    src={service.icon}
                    alt={service.name} 
                    className="w-full h-full rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 w-full h-auto">
            <h3 className="text-center text-xl font-bold">{service.name}</h3> {/* Changed portfolio.name to service.name */}
            {/* dashboard image */}
            <div className="mt-5 border-t border-gray-500">
              <div className="mt-5 flex justify-between text-gray-700 items-center ">
                <span className="text-md font-bold">Benefits</span>
                <span>
                  <MdDashboard size={32} />
                </span>
              </div>
              <div className="flex items-center justify-center mt-10">
              {service.benefit && service.benefit.map((benefit) => (
                  <div key={benefit.id} className="relative border rounded-md border-gray-200 shadow-2xl p-4 m-2">
                      <h4 className="text-lg font-semibold">{benefit.title}</h4>
                      <p className="text-gray-600">{benefit.description}</p>
                  </div>
              ))}
              </div>
            </div>
            <div className="mt-12">
              <p className="text-justify text-gray-600 text-base">
                {service.description} 
              </p>
            </div>
            <div className="mt-10 border-t border-gray-500">
              <div className="mt-5 flex justify-between text-gray-700 items-center ">
                <span className="text-md font-bold">Category</span>
                <span>
                  <MdSettings size={32} />
                </span>
              </div>
              <div>{service.category.title}</div>
            </div>
            {/* Add RelatedPosts component */}
          </div>
        </div>
        {/* <RelatedCategoryPortfolio
          category={service.category.id} 
          currentPostId={service.id} 
        /> */}
      </div>
    </div>
  );
};

export default ServiceDetailsPage;