// src/CustomerWaitingScreen.js
import React from "react";
import { motion } from "framer-motion";
import { desktops, customers } from "../Utilities/dta.js";
import DesktopAnimation from "./DesktopAnimation";

const CustomerWaitingScreen = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
        Customer Waiting Screen
      </h1>

      <div className="mb-12">
        <DesktopAnimation />
      </div>

      {/* Desktop Icons Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
        {desktops.map((desktop) => (
          <motion.div
            key={desktop.id}
            className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-2xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-4xl mb-2">{desktop.icon}</div>
            <p className="text-sm font-semibold">{desktop.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Customer List */}
      <div className="space-y-4 max-w-2xl mx-auto">
        {customers.map((customer) => (
          <motion.div
            key={customer.id}
            className="bg-gray-800 rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: customer.id * 0.1 }}
          >
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-blue-400">
                {customer.name}
              </h2>
              <p className="text-gray-400">User ID: {customer.id}</p>
              <p className="text-gray-400">
                Please proceed to:{" "}
                <span className="font-medium text-blue-400">
                  {desktops.find((d) => d.id === customer.desktop)?.name}
                </span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CustomerWaitingScreen;
