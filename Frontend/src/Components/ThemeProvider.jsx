import React from "react";
import PropTypes from "prop-types";
import { lightTheme, darkTheme } from "../theme";
import useDarkMode from "../hooks/useDarkMode";
import backgroundImage from "../assets/w1xrn7i51u5b1.png"; // Move this to the top

export default function ThemeProvider({ children }) {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;


    return (
        <div className={theme}>
            <div
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
                className="bg-white text-gray-900 dark:text-gray-200 dark:bg-[rgb(16,9,55)] min-h-screen"
            >
                {children}
            </div>
        </div>
    );
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};