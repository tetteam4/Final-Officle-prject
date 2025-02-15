import React from 'react'
import { FaChevronRight, FaClock } from 'react-icons/fa';

function NesCard({ blog, onClick, className }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer group ${className}`}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={blog.hero_image}
          alt={blog.title}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-[#02DB81]/10 text-[#02DB81] rounded-full text-sm font-medium">
            {blog.category.name}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <FaClock className="mr-1" /> {blog.read_time} min read
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
          {blog.description}
        </p>

        <div className="flex items-center text-[#02DB81] font-medium">
          Read Article
          <FaChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}

export default NesCard