// RespNavbar.jsx (or whatever your filename is)
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavData } from "./navdata"; // Changed import to useNavData
import MegaMenu from "./MegaMenu";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const { navData, loading, error } = useNavData(); // Use the hook
  const [hoveredItem, setHoveredItem] = useState(null);
  const [delayedItem, setDelayedItem] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const hoverTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); 
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (index) => {
    hoverTimeout.current = setTimeout(() => setDelayedItem(index), 100);
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    setDelayedItem(null);
    setHoveredItem(null);
  };

  return (
    <nav
      className={`w-full hidden lg:block z-30 transition-all duration-500 dark:bg-gray-900 ${
        isScrolled
          ? "fixed top-0 left-0 shadow-md"
          : "relative bg-transparent bg-white"
      }`}
    >
      <div
        className={`px-4 py-1.5 flex justify-center items-center ${
          isScrolled ? "bg-white text-gray-900" : "relative bg-white"
        }`}
      >
        <ul className="lg:flex lg:gap-4 p-4 lg:p-0 space-y-4 lg:space-y-0 flex justify-center items-center w-full">
          {loading ? (
            <li>Loading navigation...</li>
          ) : error ? (
            <li>Error loading navigation: {error.message}</li>
            ) : (
            navData.map((item, index) => (
              <li
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={handleMouseLeave}
                onFocus={() => handleMouseEnter(index)}
                onBlur={handleMouseLeave}
                className="px-1 py-2 group"
                role="menuitem"
              >
                <Link
                  to={item.path}
                  className={`transition-colors flex items-center text-md font-sans font-semibold duration-300 hover:text-gray-900 ${
                    isScrolled ? "" : "text-gray-600"
                  }`}
                  aria-haspopup={!!item.subCategories}
                  aria-expanded={delayedItem === index}
                >
                  {item.name}
                  {item.subCategories && (index === 1 || index === 3) && (
                    <span className="ml-1 transform group-hover:rotate-180 transition-transform duration-300">
                      <IoMdArrowDropdown size={28} />
                    </span>
                  )}
                </Link>

                {delayedItem === index && item.subCategories && (
                  <>
                    <div
                      className="fixed left-0 right-0 top-40 bottom-0 bg-black opacity-50 z-10"
                      onMouseEnter={handleMouseLeave}
                    ></div>
                    <div
                      className={`${
                        isScrolled ? "fixed top-[50px]" : "absolute top-12"
                      } left-0 w-full z-40`}
                    >
                      <MegaMenu
                        subCategories={item.subCategories}
                        isVisible={true}
                      />
                    </div>
                  </>
                )}
                
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
