import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-6 mt-12 shadow-inner">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm tracking-wide">&copy; 2025 <span className="font-semibold">AuroVoice DAO Web</span>. All Rights Reserved.</p>
        <div className="flex space-x-6 text-sm">
          <a
            href="#"
            className="hover:text-green-400 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-green-400 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Terms of Use
          </a>
          <a
            href="#"
            className="hover:text-green-400 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
