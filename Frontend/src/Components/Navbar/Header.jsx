import React, { useState } from "react";
import RespNavbar from "./RespNavbar";
import { LuLogIn } from "react-icons/lu";
import { Link } from "react-router-dom";
import logo from "../../assets/tet.png";
import { MdMenu, MdClose } from "react-icons/md";
import { MdWbSunny, MdNightlight } from "react-icons/md";
import useDarkMode from "../../hooks/useDarkMode";

const Header = () => {
  const [isOpne, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode();

 
  const repsonsiveHandler = () => {
    setIsOpen(!isOpne);
  };

  return (
    <header className="fixed top-0 lg:sticky z-30 p-2 dark:bg-purple-950 left-0 right-0 bg-purple-950">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
        {/* Logo and Menu Button */}
        <div className="flex items-center gap-x-5 md:col-span-2 lg:col-span-1">
          <div
            onClick={repsonsiveHandler}
            
            className="flex lg:hidden cursor-pointer justify-end items-center"
          >
            <span className="text-white hover:bg-gray-400 rounded-full p-2 hover:text-white transition duration-300">
              {isOpne ? <MdClose size={30} /> : <MdMenu size={30} />}
            </span>
          </div>
          <div className="text-3xl font-bold">
            <Link to="/" className="text-lg font-bold">
              <img
                src={logo}
                alt="TET Logo"
                className="h-16 w-auto dark:mix-blend-normal dark:rounded-md"
              />
            </Link>
          </div>
        </div>

        {/* Login in responsive */}
        <div className="flex justify-end lg:hidden">
          <Link to="/sign-up" className="flex items-center bg-gray-50 p-1">
            <span className="px-2 text-sm font-semibold">Login</span>
            <span>
              <LuLogIn className="text-gray-700" size={20} />
            </span>
          </Link>
        </div>

        {/* Desktop Login and Icons */}
        <div className="lg:flex items-center col-span-1 hidden justify-end gap-x-5">
          {/* Actions (Theme Toggle & Email Icon) */}
          <div className="flex items-center justify-between py-1.5 gap-x-5">
            {/* Dark Mode Toggle */}
            <div
              className={`relative flex items-center w-[110px] h-[40px] cursor-pointer rounded-full  
      ${
        darkMode === "dark" ? "bg-zinc-700" : "bg-white"
      } shadow-sm transition-all duration-300`}
            >
              {/* Toggle Circle */}
              <div
                className={`absolute w-[35px] h-[35px] rounded-full top-[2px] transition-all duration-300 shadow-md
        ${
          darkMode === "dark"
            ? "left-[102px] translate-x-[-100%] bg-zinc-900"
            : "left-[4px] bg-gradient-to-r from-orange-500 to-yellow-400"
        }`}
              ></div>

              {/* Sun Icon (Light Mode) */}
              <MdWbSunny
                onClick={() => setDarkMode("light")}
                className={`absolute left-[13px] w-5 h-5 transition-all ${
                  darkMode === "dark" ? "opacity-50" : "opacity-100"
                }`}
              />

              {/* Moon Icon (Dark Mode) */}
              <MdNightlight
                onClick={() => setDarkMode("dark")}
                className={`absolute right-[13px] w-5 h-5 transition-all ${
                  darkMode === "dark"
                    ? "opacity-100 text-blue-700"
                    : "opacity-50 text-black"
                }`}
              />
            </div>

            {/* Login Button */}
            <Link
              to="/sign-up"
            >
              <button
                className="flex items-center justify-center  bg-gradient-to-r from-[#af40ff] via-[#5b42f3] to-[#00ddeb] rounded-lg shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] transition-all duration-300 ease-in-out hover:shadow-[0_20px_40px_-5px_rgba(151,65,252,0.3)] active:scale-90 active:shadow-[0_10px_20px_-5px_rgba(151,65,252,0.2)]"
                // onClick={onClick}
              >
                <span className="bg-[#05062d] px-6 py-4 rounded-lg text-white text-lg font-medium transition-all duration-300 ease-in-out hover:bg-transparent">
                 get Started
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive Navbar */}
      {isOpne && (
        <div>
          {/* Overlay */}
          <div
            onClick={repsonsiveHandler}
            className="fixed left-0 right-0 top-24 bottom-0 bg-black opacity-80 z-10"
          ></div>

          {/* Navbar */}
          <RespNavbar
            repsonsiveHandler={repsonsiveHandler}
            setDarkMode={setDarkMode}
            darkMode={darkMode}
            isOpne={isOpne}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
