import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [faqOpenIndex, setFaqOpenIndex] = useState(null); // Track which FAQ item is open

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data Submitted:", formData);
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const toggleFaq = (index) => {
    setFaqOpenIndex(faqOpenIndex === index ? null : index);
  };

  // FAQ Data
  const faqData = [
    {
      question: "How can I contact support?",
      answer:
        "You can contact our support team via email at support@techcompany.com or call us at +1 (123) 456-7890.",
    },
    {
      question: "What are your working hours?",
      answer:
        "Our support team is available from Monday to Friday, 9:00 AM to 6:00 PM.",
    },
    {
      question: "Do you offer custom solutions?",
      answer:
        "Yes, we provide custom solutions tailored to your needs. Please contact us for more details.",
    },
    {
      question: "Where is your office located?",
      answer:
        "Our office is located at 123 Tech Street, Silicon Valley, CA 94025, USA.",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Contact Us
        </h1>

        {/* Contact Information and Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Our Office
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    123 Kuble Street, Barchi Golaei, AF
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaPhone className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Phone Numbers
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    +9377238385
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                     +9377238385
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaEnvelope className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Email
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    teteam4@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaClock className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Working Hours
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Mon - Fri: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Find Us on the Map
          </h2>
          <div className="relative h-96 w-full rounded-lg overflow-hidden">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3288.0112142208545!2d69.09363771131511!3d34.50259997287803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzTCsDMwJzA5LjQiTiA2OcKwMDUnNDYuNCJF!5e0!3m2!1sen!2s!4v1739876765134!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  {faqOpenIndex === index ? (
                    <FaChevronUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <FaChevronDown className="w-5 h-5 text-green-600" />
                  )}
                </button>
                {faqOpenIndex === index && (
                  <p className="text-gray-600 dark:text-gray-300 pb-4">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Need Help?
          </h2>
          <div className="flex items-center gap-4">
            <MdOutlineSupportAgent className="w-12 h-12 text-green-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Customer Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our support team is here to help you with any questions or
                issues. Contact us via email or phone, or visit our FAQ section.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
