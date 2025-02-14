import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion

const ServiceDetailsPage = () => {
  const { pkid } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/api/services/${pkid}/`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setService(data);
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

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.2, duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  if (loading) {
    return <div>Loading service details...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!service) {
    return (
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="text-center mt-10"
      >
        <h1 className="text-2xl font-bold">No Service Data Available</h1>
        <button
          onClick={() => navigate("/services")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back to Services
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-3xl mx-auto py-10 px-5 bg-white shadow-lg rounded-md"
    >
      <h1 className="text-3xl font-extrabold mb-5 text-gray-900 dark:text-white text-center">
        {service.name}
      </h1>

      {/* Category Information */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Category
        </h2>
        <div className="flex items-center">
          {service.category.icon && (
            <img
              src={service.category.icon}
              alt={service.category.title}
              className="w-6 h-6 mr-2 rounded-full"
            />
          )}
          <span className="text-gray-600 dark:text-gray-400">
            {service.category.title}
          </span>
        </div>
      </div>

      {/* Service Image */}
      <div className="mb-6">
        <img
          src={service.image}
          alt={service.name}
          className="w-full rounded-md shadow-md"
        />
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Description
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-justify">
          {service.description}
        </p>
      </div>

      {/* Video Link */}
      {service.video && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Video
          </h2>
          <a
            href={service.video}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Watch Video
          </a>
        </div>
      )}

      {/* Benefits */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Benefits
        </h2>
        {service.benefit && service.benefit.length > 0 ? (
          <ul className="list-disc pl-5">
            {service.benefit.map((benefit) => (
              <li key={benefit.id} className="mb-2">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No benefits listed for this service.
          </p>
        )}
      </div>

      {/* Back to Services Button */}
      <div className="mt-8 text-center">
        <Link
          to="/services"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
        >
          Back to Services
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceDetailsPage;
