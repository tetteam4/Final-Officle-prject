







/// vesrion 1
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { booths, customers } from "../Utilities/dta";

// const CustomerWaitingScreen = () => {
//   const [selectedCustomer, setSelectedCustomer] = useState(null);

//   return (
//     <div dir="ltr" className="min-h-screen text-b flex flex-col p-8">
//       {/* Header */}
//       <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
//         صفحه انتظار مشتریان
//       </h1>

//       {/* Main Content (Divided into 2 Sections) */}
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Section 1: Booth Grid */}
//         <div className="flex-1">
//           <h2 className="text-2xl font-semibold text-center mb-6">وضعیت میزها</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {booths.map((booth) => (
//               <motion.div
//                 key={booth.id}
//                 className={`p-6 rounded-lg text-center shadow-lg transition-all ${
//                   booth.isBusy
//                     ? "bg-red-600 cursor-not-allowed"
//                     : "bg-green-600 cursor-pointer hover:shadow-2xl"
//                 }`}
//                 whileHover={{ scale: booth.isBusy ? 1 : 1.05 }}
//                 whileTap={{ scale: booth.isBusy ? 1 : 0.95 }}
//               >
//                 <div className="text-4xl mb-2">{booth.icon}</div>
//                 <p className="text-sm font-semibold">{booth.name}</p>
//                 <p className="text-xs mt-2">
//                   {booth.isBusy ? "مشغول" : "آماده"}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Section 2: Customer List and Announcement */}
//         <div className="flex-1">
//           {/* Announcement Section */}
//           {selectedCustomer && (
//             <motion.div
//               className="bg-blue-600 rounded-lg p-6 mb-8 text-center shadow-2xl"
//               initial={{ opacity: 0, y: -50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <p className="text-2xl font-semibold">
//                 {selectedCustomer.icon} {selectedCustomer.name} لطفا در{" "}
//                 <span className="text-yellow-400">
//                   {booths.find((b) => b.id === selectedCustomer.booth)?.name}
//                 </span>{" "}
//                 بخاطر سفارش خود تشریف بیارید.
//               </p>
//             </motion.div>
//           )}

//           {/* Customer List */}
//           <h2 className="text-2xl font-semibold text-center mb-6">لیست مشتریان</h2>
//           <div className="space-y-4">
//             {customers.map((customer) => (
//               <motion.div
//                 key={customer.id}
//                 className="bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer hover:bg-gray-700 transition-colors"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => setSelectedCustomer(customer)}
//               >
//                 <div className="flex items-center space-x-4">
//                   <div className="text-2xl">{customer.icon}</div>
//                   <div>
//                     <h2 className="text-xl font-semibold text-blue-400">
//                       {customer.name}
//                     </h2>
//                     <p className="text-gray-400">
//                       به {booths.find((b) => b.id === customer.booth)?.name}{" "}
//                       مراجعه کنید.
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerWaitingScreen;




///version 2

// src/CustomerWaitingScreen.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { booths, customers } from "../Utilities/dta";

const CustomerWaitingScreen = () => {
  const [currentCustomerIndex, setCurrentCustomerIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const currentCustomer = customers[currentCustomerIndex];
  const assignedBooth = booths.find((b) => b.id === currentCustomer.booth);

  // Typing animation for customer name
  useEffect(() => {
    if (isTyping) {
      const timeout = setTimeout(() => {
        setDisplayText(currentCustomer.name.slice(0, displayText.length + 1));
      }, 100); // Typing speed

      if (displayText === currentCustomer.name) {
        setIsTyping(false);
      }

      return () => clearTimeout(timeout);
    }
  }, [displayText, isTyping, currentCustomer.name]);

  // Move to the next customer after a delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentCustomerIndex((prev) => (prev + 1) % customers.length);
      setDisplayText("");
      setIsTyping(true);
    }, 5000); // Delay before showing the next customer

    return () => clearTimeout(timeout);
  }, [currentCustomerIndex]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      {/* Ready Booths */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
        {booths
          .filter((booth) => !booth.isBusy)
          .map((booth) => (
            <motion.div
              key={booth.id}
              className="p-6 rounded-lg text-center shadow-lg bg-green-600 hover:shadow-2xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-6xl mb-2">{booth.icon}</div>
              <p className="text-sm font-semibold">{booth.name}</p>
            </motion.div>
          ))}
      </div>

      {/* Customer Announcement */}
      <div className="bg-blue-600 rounded-lg p-8 text-center shadow-2xl max-w-md w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCustomer.id}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl mb-4">{currentCustomer.icon}</div>
            <p className="text-2xl font-semibold">
              {displayText}
              {isTyping && (
                <motion.span
                  className="ml-1"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  |
                </motion.span>
              )}
            </p>
            <p className="text-lg mt-4">
              لطفا به{" "}
              <span className="text-yellow-400 font-semibold">
                {assignedBooth?.name}
              </span>{" "}
              مراجعه کنید.
            </p>
            <motion.div
              className="text-4xl mt-4"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ➡️
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomerWaitingScreen;