import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../Portfolio/Breadcrumb";
import {
  MdDashboard,
  MdRoomService,
  MdSettings,
  MdPlayCircle,
} from "react-icons/md";
import Spinner from "../../Components/Blog/LoadingSpinner"; // Assume you have a Spinner component

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/services/${id}/`
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setService(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <Spinner size="lg" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 dark:bg-gray-900">
        <div className="max-w-md bg-red-50 dark:bg-red-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-100 mb-4">
            Error Loading Service
          </h2>
          <p className="text-red-700 dark:text-red-200 mb-4">{error.message}</p>
          <button
            onClick={() => navigate("/services")}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Return to Services
          </button>
        </div>
      </div>
    );

  if (!service)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 dark:bg-gray-900">
        <div className="max-w-md bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-100 mb-4">
            Service Not Found
          </h1>
          <button
            onClick={() => navigate("/services")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Services
          </button>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      <Breadcrumb
        paths={[
          { name: "Services", href: "/services" },
          {
            name: service.category.title,
            href: `/services/category/${service.category.id}`,
          },
          { name: service.name },
        ]}
      />

      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Hero Section */}
        <div className="relative">
          {service.image && (
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-64 object-cover object-center"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-4xl font-bold text-white mb-2">
              {service.name}
            </h1>
            <div className="flex items-center space-x-2">
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-3 py-1 rounded-full text-sm font-medium">
                {service.category.title}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 lg:p-8">
          <div className="prose max-w-none mb-8">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Video Section */}
          {service.video && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold flex items-center gap-2 dark:text-white">
                  <MdPlayCircle className="text-green-600" />
                  Video Overview
                </h3>
              </div>
              <a
                href={service.video}
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative rounded-xl overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-8">
                  <img
                    src={service.image}
                    alt="Video thumbnail"
                    className="object-cover transform transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center transform transition group-hover:scale-110">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          )}

          {/* Benefits Section */}
          {service.benefit?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 dark:text-white">
                <MdDashboard className="text-green-600" />
                Key Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.benefit.map((benefit) => (
                  <div
                    key={benefit.id}
                    className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Details */}
          <div className="border-t pt-8 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-white">
                  <MdSettings className="text-green-600" />
                  Service Details
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Category:</span>{" "}
                    {service.category.title}
                  </p>
                  {service.icon && (
                    <div className="mt-4">
                      <img
                        src={service.icon}
                        alt="Service icon"
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-white">
                  <MdRoomService className="text-green-600" />
                  Need More Information?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Contact our Tech Elevate Team consultants for detailed
                  information about our {service.category.title} services.
                </p>
                <button
                  onClick={() => navigate("/contact")}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Contact Our Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
