import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero_Home = () => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/hero-images/"); //get data
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setHero(data[0]); // Assuming API returns an array, take the first item
      } catch (error) {
        setError(error);
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) {
    return <div>Loading hero data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!hero) {
    return <div>No hero data available.</div>;
  }

  return (
    <div className="relative w-full h-[81vh]">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={hero.video} type="video/mp4" />{" "}
        {/* Dynamic video source */}
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full">
        <h1 className="text-4xl md:text-4xl font-bold mb-6">{hero.head}</h1>
        <p className="text-lg md:text-xl mb-8">{hero.description}</p>
        <Link
          to="/services"
          className="px-7 py-3 bg-[#02DB81] hover:bg-[#2d9469] text-white rounded-full font-semibold transition shadow-md duration-200 hover:shadow-[1px_5px_20px_2px_rgba(2,219,129,0.5)]"
        >
          Discover Our Services
        </Link>
      </div>
    </div>
  );
};

export default Hero_Home;
