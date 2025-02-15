// BeCreative.js
import React from "react";
import {
  FaUsers,
  FaHeadset,
  FaRegHandshake,
  FaRegStar,
  FaChartLine,
} from "react-icons/fa";

const BeCreativeAndDistinct = () => {
  return (
    <div className="text-center py-8 px-4 sm:py-12 sm:px-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
        Be Creative and Distinct
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto">
        At the heart of our company, we believe in the power of creativity and
        distinction. We strive to offer solutions that not only meet the needs
        of today but pave the way for tomorrow. Our team is committed to
        delivering outstanding service while maintaining a focus on innovation.
        Join us in creating a future that stands out!
      </p>

      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-5 mb-8 sm:mb-12">
        <div className="flex flex-col items-center">
          <FaUsers
            size={30}
            sm:size={40}
            className="text-blue-500 mb-2 sm:mb-4"
          />
          <h3 className="text-sm sm:text-md font-semibold text-gray-700 dark:text-gray-300">
          1 Years of Customer Loyalty
          </h3>
        </div>
        <div className="flex flex-col items-center">
          <FaHeadset
            size={30}
            sm:size={40}
            className="text-green-500 mb-2 sm:mb-4"
          />
          <h3 className="text-sm sm:text-md font-semibold text-gray-700 dark:text-gray-300">
            Professional and Expert Team
          </h3>
        </div>
        <div className="flex flex-col items-center">
          <FaRegHandshake
            size={30}
            sm:size={40}
            className="text-yellow-500 mb-2 sm:mb-4"
          />
          <h3 className="text-sm sm:text-md font-semibold text-gray-700 dark:text-gray-300">
            24/7 Customer Support
          </h3>
        </div>
        <div className="flex flex-col items-center">
          <FaRegStar
            size={30}
            sm:size={40}
            className="text-purple-500 mb-2 sm:mb-4"
          />
          <h3 className="text-sm sm:text-md font-semibold text-gray-700 dark:text-gray-300">
            Sales Solutions
          </h3>
        </div>
        <div className="flex flex-col items-center">
          <FaChartLine
            size={30}
            sm:size={40}
            className="text-red-500 mb-2 sm:mb-4"
          />
          <h3 className="text-sm sm:text-md font-semibold text-gray-700 dark:text-gray-300">
            Full Service Solutions
          </h3>
        </div>
      </div>
    </div>
  );
};

export default BeCreativeAndDistinct;
