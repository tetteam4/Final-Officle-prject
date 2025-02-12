import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CodeGenerationAnimation = () => {
  const codeLines = [
    {
      text: "function greet() {",
      type: "keyword",
    },
    {
      text: "  console.log('Hello, World!');",
      type: "function",
    },
    {
      text: "}",
      type: "keyword",
    },
    {
      text: "greet();",
      type: "function",
    },
    {
      text: "",
      type: "empty",
    },
    {
      text: "class User {",
      type: "keyword",
    },
    {
      text: "  constructor(name, email) {",
      type: "keyword",
    },
    {
      text: "    this.name = name;",
      type: "variable",
    },
    {
      text: "    this.email = email;",
      type: "variable",
    },
    {
      text: "  }",
      type: "keyword",
    },
    {
      text: "",
      type: "empty",
    },
    {
      text: "  getInfo() {",
      type: "keyword",
    },
    {
      text: "    return `Name: ${this.name}, Email: ${this.email}`;",
      type: "string",
    },
    {
      text: "  }",
      type: "keyword",
    },
    {
      text: "",
      type: "empty",
    },
    {
      text: "  updateEmail(newEmail) {",
      type: "keyword",
    },
    {
      text: "    this.email = newEmail;",
      type: "variable",
    },
    {
      text: "  }",
      type: "keyword",
    },
    {
      text: "",
      type: "empty",
    },
    {
      text: "  static createUser(name, email) {",
      type: "keyword",
    },
    {
      text: "    return new User(name, email);",
      type: "function",
    },
    {
      text: "  }",
      type: "keyword",
    },
    {
      text: "}",
      type: "keyword",
    },
    {
      text: "",
      type: "empty",
    },
    {
      text: "const user1 = User.createUser('Alice', 'alice@example.com');",
      type: "variable",
    },
    {
      text: "console.log(user1.getInfo());",
      type: "function",
    },
  ];

  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        const newLines = [...prev, codeLines[currentIndex]];
        currentIndex = (currentIndex + 1) % codeLines.length; // Loop back to the start
        return newLines.length > 10 ? newLines.slice(-10) : newLines; // Show only the last 10 lines
      });
    }, 1000); // Adjust the speed of the animation

    return () => clearInterval(interval);
  }, []);

  const getColorClass = (type) => {
    switch (type) {
      case "keyword":
        return "text-blue-400";
      case "function":
        return "text-yellow-300";
      case "string":
        return "text-green-500";
      case "comment":
        return "text-gray-500";
      case "variable":
        return "text-gray-200";
      case "operator":
        return "text-pink-400";
      default:
        return "text-gray-200";
    }
  };

  const typingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="h-auto flex items-center justify-center  py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">
        {/* First Code Block */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800 dark:bg-gray-500 p-6 md:p-8 rounded-lg shadow-2xl shadow-gray-500 col-span-2"
        >
          <div className="flex space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="font-mono text-xs md:text-sm overflow-hidden h-64 md:h-96 no-scrollbar">
            {visibleLines.map((line, index) => (
              <div key={index} className="flex items-center">
                <span className="text-green-400 mr-2">$</span>
                <span className={getColorClass(line.type)}>
                  {line.text.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      variants={typingVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{
                        delay: index * 0.3 + charIndex * 0.01, // Adjust typing speed
                        duration: 0.1,
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Second Code Block */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800 dark:bg-gray-500 p-6 md:p-8 rounded-lg shadow-2xl shadow-gray-500 col-span-1"
        >
          <div className="flex space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="font-mono text-xs md:text-sm overflow-hidden h-64 md:h-96 no-scrollbar">
            {visibleLines.map((line, index) => (
              <div key={index} className="flex items-center">
                <span className="text-green-400 mr-2">$</span>
                <span className={getColorClass(line.type)}>
                  {line.text.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      variants={typingVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{
                        delay: index * 0.2 + charIndex * 0.01, // Adjust typing speed
                        duration: 0.1,
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CodeGenerationAnimation;
