import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/services/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div>Error loading services: {error.message}</div>;
  }

  return (
    <div>
      <div className="bg-gray-100 p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              to={`/services/${service.pkid}`}
              key={service.id}
              className="block"
            >
              <div className="bg-white shadow-md rounded-lg p-6 text-center transition-transform duration-300 hover:scale-105">
                <div className="text-4xl mb-4">
                  {service.icon ? (
                    <img
                      src={service.icon}
                      alt={service.category.title}
                      style={{ maxWidth: "50px", maxHeight: "50px" }}
                    />
                  ) : (
                    "No Icon"
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {service.category.title}
                </h3>{" "}
                {/* Using category title */}
                <p className="text-gray-700">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
