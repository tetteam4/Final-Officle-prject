import React, { useState } from "react";
import { FaInstagram, FaTwitter, FaFacebook, FaTiktok } from "react-icons/fa";
import {
  FaShippingFast,
  FaMoneyBillAlt,
  FaHeadset,
  FaUndoAlt,
  FaCheckCircle,
} from "react-icons/fa";
import logo from "../../assets/tet.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(emailValue)) {
      setIsValidEmail(true);
      setErrorMessage("");
    } else {
      setIsValidEmail(false);
      setErrorMessage("Please enter a valid email address.");
    }
  };

  return (
    <footer className="bg-purple-950 text-gray-100 border-t border-gray-100">
      {/* Top Section */}
      <div className="w-full mx-auto container mb-5 flex flex-col md:flex-row justify-between items-center p-4">
        {/* Logo and Contact Info */}
        <div className="text-md text-center md:text-left mb-4 md:mb-0">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <img src={logo} alt="Logo" className="w-[200px]" />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-x-7 mt-2">
            <p>Telephone: +93772387935</p>
            <p className="border-r border-l px-5 border-gray-100">
             Email:hussain.mohammadi1380@gmail.com
            </p>
            <p className="text-md">We are available 24/7 to assist you.</p>
          </div>
        </div>
      </div>

      {/* Quality Section */}
      <div className="py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
          <div className="flex flex-col items-center">
            <FaShippingFast className="text-red-700 text-4xl mb-2" />
            <p className="text-sm">Fast and secure delivery service</p>
          </div>

          <div className="flex flex-col items-center">
            <FaMoneyBillAlt className="text-red-700 text-4xl mb-2" />
            <p className="text-sm">Pay at your doorstep</p>
          </div>

          <div className="flex flex-col items-center">
            <FaHeadset className="text-red-700 text-4xl mb-2" />
            <p className="text-sm">24/7 customer support</p>
          </div>

          <div className="flex flex-col items-center">
            <FaUndoAlt className="text-red-700 text-4xl mb-2" />
            <p className="text-sm">Easy return within 7 days</p>
          </div>

          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-red-700 text-4xl mb-2" />
            <p className="text-sm">100% authentic products</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-4">Customer Services</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/blog">News Room</a>
            </li>
            <li>
              <a href="/portfoli">Portifolio</a>
            </li>
            <li>
              <a href="/services">Our services</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#">Frequently Asked Questions (FAQ)</a>
            </li>
            <li>
              <a href="#">Best Sellers</a>
            </li>
            <li>
              <a href="#">Offers & Discounts</a>
            </li>
          </ul>
        </div>

    

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Stay with us!</h4>
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
            >
              <FaInstagram className="text-pink-600" size={30} />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
            >
              <FaTwitter className="text-blue-500" size={30} />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
            >
              <FaFacebook className="text-blue-800" size={30} />
            </a>
            <a
              href="#"
              className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
            >
              <FaTiktok className="text-black" size={30} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-200 text-gray-600 text-center py-4">
        <p className="text-sm">
          © {new Date().getFullYear()} TET Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
