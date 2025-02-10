import React from "react";
import { RxArrowRight } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog, onClick }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white flex flex-col justify-between rounded-t-xl h-[500px] w-[350px] shadow-xl ga">
      {/* Image Section */}
      <div className="h-[200px]">
        <img
          src={blog?.hero_image}
          alt={blog?.title}
          className="w-full h-full object-cover rounded-t-xl"
        />
      </div>

      {/* User & Date Section */}
      <div className="text-gray-600 flex gap-4 px-4 items-center justify-between text-sm h-[50px]">
        <div className="flex gap-x-2 items-center">
          <div className="border rounded-full bg-gray-600 h-8 w-8 p-1 flex justify-center items-center">
            <FaUser size={20} className="text-gray-50" />
          </div>
          <p className="text-lg font-bold">TET</p>
        </div>
      </div>

      {/* Title and Description Section */}
      <div className="px-4 h-[160px] overflow-hidden">
        <h3 className="text-md font-semibold h-[40px] overflow-hidden text-ellipsis">
          {blog?.title}
        </h3>
        <p className="text-justify text-md h-[110px] mt-4 overflow-hidden text-ellipsis">
          {blog?.general_info?.length > 130
            ? blog?.general_info.substring(0, 130) + "..."
            : blog?.general_info}
        </p>
      </div>

      {/* Read More Button */}
      <div
        onClick={onClick}
        className="relative group cursor-pointer overflow-hidden h-[50px]"
      >
        {/* Background animation effect */}
        <div className="absolute inset-0 w-0 bg-gradient-to-r from-[#02DB81] to-[#2d9469] transition-all duration-500 group-hover:w-full"></div>

        {/* Button Content */}
        <div className="relative py-3 px-4 flex items-center justify-between border z-10 transition-all duration-500 group-hover:text-white">
          <span>Read Article</span>
          <RxArrowRight size={24} />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
