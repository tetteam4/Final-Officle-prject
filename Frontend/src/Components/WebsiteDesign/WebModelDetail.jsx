import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Breadcrumb from "../Portfolio/Breadcrumb";
import {
  MdModelTraining,
  MdDesignServices,
  MdInfo,
  Md3dRotation,
} from "react-icons/md";
import Spinner from "../../Components/Blog/LoadingSpinner";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const WebModelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [webModel, setWebModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchWebModel = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/webmodels/${id}/`
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setWebModel(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWebModel();
    window.scrollTo(0, 0);
  }, [id]);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({
      left: -carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({
      left: carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-purple-950">
        <Spinner size="lg" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 dark:bg-purple-950">
        <div className="max-w-md bg-red-50 dark:bg-red-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-100 mb-4">
            Error Loading Model
          </h2>
          <p className="text-red-700 dark:text-red-200 mb-4">{error.message}</p>
          <button
            onClick={() => navigate("/webmodels")}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Return to Models
          </button>
        </div>
      </div>
    );

  if (!webModel)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 dark:bg-purple-950">
        <div className="max-w-md bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-100 mb-4">
            Model Not Found
          </h1>
          <button
            onClick={() => navigate("/webmodels")}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Browse All Models
          </button>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <Breadcrumb
        paths={[
          { name: "Web Models", href: "/webmodels" },
          {
            name: webModel.category.title,
            href: `/webmodels/category/${webModel.category.id}`,
          },
          { name: webModel.name },
        ]}
      />

      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Image Carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="carousel-inner flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
          >
            {webModel.images.map((image, index) => (
              <div
                key={image.id}
                className="carousel-item snap-start w-full shrink-0"
              >
                <img
                  src={image.image}
                  alt={`${webModel.name} - ${index + 1}`}
                  className="w-full h-96 object-cover object-center"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x400";
                  }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-full p-3 hover:bg-white/50 transition-all"
          >
            <ChevronLeftIcon className="w-8 h-8 text-purple-600" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-full p-3 hover:bg-white/50 transition-all"
          >
            <ChevronRightIcon className="w-8 h-8 text-purple-600" />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6 lg:p-8">
          <div className="prose max-w-none mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {webModel.name}
            </h1>
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 px-3 py-1 rounded-full text-sm font-medium">
                {webModel.category.title}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {webModel.description}
            </p>
          </div>

          {/* Workflow Section */}
          {webModel.workflow && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 dark:text-white">
                <MdDesignServices className="text-purple-600" />
                Design Workflow
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {webModel.workflow.split("\n").map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-white dark:bg-gray-600 rounded-lg"
                    >
                      <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                        <span className="text-purple-600 dark:text-purple-300 font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Model Details */}
          <div className="border-t pt-8 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-white">
                  <MdInfo className="text-purple-600" />
                  Model Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-200">
                      Category:
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {webModel.category.title}
                    </p>
                  </div>
                  {webModel.category.icon && (
                    <div className="mt-4">
                      <img
                        src={webModel.category.icon}
                        alt="Category icon"
                        className="w-20 h-20 object-contain"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/100";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-white">
                  <Md3dRotation className="text-purple-600" />
                  Custom Model Solution
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Need a customized web model solution? Our design team can
                  create bespoke models tailored to your specific requirements.
                </p>
                <button
                  onClick={() => navigate("/contact")}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Request Custom Model
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebModelDetail;
