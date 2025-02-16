import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"; // Or any icon library you prefer

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="animate-pulse">{/* Skeleton Loader Content */}</div>
);

// Image Component with Fallback
const ImageWithFallback = ({ src, alt, className }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <img
      src={imageError ? "https://via.placeholder.com/150" : src}
      alt={alt}
      className={className}
      onError={handleImageError}
    />
  );
};

ImageWithFallback.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

// WebModelDetail Component
const WebModelDetail = () => {
  const { id } = useParams();
  const [webModel, setWebModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null); // Ref for the carousel container

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
  }, [id]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
    }
  };

  if (loading) return <SkeletonLoader />;
  if (error)
    return <div className="p-8 text-red-500">Error: {error.message}</div>;
  if (!webModel) return <div className="p-8">No data found.</div>;

  return (
    <div className="dark:bg-purple-950 p-8 min-h-screen">
      {/* Web Model Details */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        {webModel.name}
      </h2>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        {/* Carousel */}
        <div className="carousel-container relative mb-4">
          <div
            className="carousel-inner flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
            ref={carouselRef}
          >
            {webModel.images.map((image, index) => (
              <div
                key={image.id}
                className="carousel-item snap-start w-full shrink-0"
              >
                <ImageWithFallback
                  src={image.image}
                  alt={`Web Model ${webModel.id} - Image ${index + 1}`}
                  className="w-full h-64 object-contain rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 rounded-full p-2 opacity-50 hover:opacity-100 transition-opacity"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 rounded-full p-2 opacity-50 hover:opacity-100 transition-opacity"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Text-Based Information */}
        <div className="text-center">
          {/* Category Information */}
          <p className="text-gray-700 dark:text-gray-400 mb-2">
            <span className="font-semibold">Category:</span>{" "}
            {webModel.category.title}
          </p>

          {/* Web Model Name and Description */}
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            {webModel.name}
          </h3>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            <span className="font-semibold">Description:</span>{" "}
            {webModel.description}
          </p>
          
          {webModel.category.icon && (
            <ImageWithFallback
              src={webModel.category.icon}
              alt={webModel.category.title}
              className="w-12 h-12 mx-auto mb-4"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WebModelDetail;
