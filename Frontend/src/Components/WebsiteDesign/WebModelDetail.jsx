import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="bg-gray-300 dark:bg-gray-700 h-8 w-1/2 mx-auto rounded"></div>
    <div className="bg-gray-300 dark:bg-gray-700 h-6 w-1/4 mx-auto rounded"></div>
    <div className="bg-gray-300 dark:bg-gray-700 h-4 w-3/4 mx-auto rounded"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 dark:bg-gray-700 h-48 rounded-lg"
        ></div>
      ))}
    </div>
  </div>
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

  useEffect(() => {
    const fetchWebModel = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/webmodels/${id}/`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWebModel(data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWebModel();
  }, [id]);

  if (loading) {
    return (
      <div className="p-8">
        <SkeletonLoader />
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-red-500 text-center">Error: {error}</div>;
  }

  if (!webModel) {
    return (
      <div className="p-8 text-center text-gray-700 dark:text-gray-300">
        No data found.
      </div>
    );
  }

  return (
    <div className="dark:bg-purple-950 p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          {webModel.name}
        </h2>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <div className="text-center">
            {/* Display Category Icon */}
            {webModel.category?.icon && (
              <ImageWithFallback
                src={webModel.category.icon}
                alt={webModel.category.title}
                className="w-12 h-12 mx-auto mb-4"
              />
            )}

            {/* Display Category Title */}
            <p className="text-gray-700 dark:text-gray-400 mb-2">
              <span className="font-semibold">Category:</span>{" "}
              {webModel.category?.title || "N/A"}
            </p>

            {/* Display Web Model Name */}
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {webModel.name}
            </h3>

            {/* Display Web Model Description */}
            <p className="text-gray-700 dark:text-gray-400 mb-4">
              <span className="font-semibold">Description:</span>{" "}
              {webModel.description || "No description available."}
            </p>

            {/* Display Workflow */}
            {webModel.workflow && (
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                <span className="font-semibold">Workflow:</span>{" "}
                {webModel.workflow}
              </p>
            )}

            {/* Display Images */}
            {webModel.images?.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  Images
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {webModel.images.map((image) => (
                    <div key={image.id} className="rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={image.image}
                        alt={`Web Model ${webModel.id}`}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebModelDetail;
