import React from "react";
import {
  FaDribbbleSquare,
  FaGithubSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full px-4 py-8 bg-[#d9e3d7]">
      <div className="max-w-[1520px] mx-auto grid lg:grid-cols-3 gap-8 text-gray-700">
        <div>
          <h1 className="text-3xl font-bold text-green-500">Plastikit</h1>
          <p className="mt-4">
            Plastikit is committed to providing innovative recycling solutions
            to make the world a cleaner place.
          </p>
          <div className="flex space-x-4 mt-6">
            <FaDribbbleSquare size={30} />
            <FaGithubSquare size={30} />
            <FaLinkedin size={30} />
            <FaTwitterSquare size={30} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Quick Links</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href="/about"
                className="hover:text-green-500 transition-colors duration-300"
              >
                About Us
              </a>
            </li>

            <li>
              <a
                href="/#"
                className="hover:text-green-500 transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <ul className="mt-4 space-y-2">
            <li>Email: info@plastikit.com</li>
            <li>Address: Anna frank 12, Ramat Gan, Shenkar</li>
          </ul>
        </div>
      </div>
      <div
        className="border-t border-gray-300 mt-8 pt-4 text-center text-gray-600"
        style={{ fontSize: "12px" }}
      >
        <div>
          © 2024 Plastikit - Koren Halevie & Roy Weizman. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
