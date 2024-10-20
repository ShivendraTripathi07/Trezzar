import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa"; // Import social media icons
import { FaPhoneAlt } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
const Footer = () => {
  return (
    <footer className="bg-slate-500 py-14">
      <div className="mx-auto w-5/6 md:flex justify-between gap-16">
        {/* Logo and Description Section */}
        <div className="mt-16 md:mt-0 md:basis-1/2">
          <div className="">
            <Link to={"/"} className="text-2xl font-bold">
              <span className="text-red-600">Tre</span>
              <span className="text-gray-800" style={{ fontStyle: "italic" }}>
                zzar
              </span>
            </Link>
          </div>

          <p className="my-5 text-white">
            Welcome to Trezzar, your one-stop destination for high-quality
            electronics and gadgets. Whether you're looking for the latest
            mobile phones, sleek AirPods, powerful printers, or top-tier
            televisions, we’ve got something for every tech enthusiast.
          </p>
        </div>

        {/* Links Section */}
        <div className="mt-16 md:mt-0 md:basis-1/4 flex flex-col">
          <h4 className="font-bold text-white">Links</h4>
          <Link to={"/aboutus"} className="my-2 text-white hover:text-red-400">
            About Us
          </Link>
          <Link to={"/cart"} className="my-1 text-white hover:text-red-400">
            Cart
          </Link>
          <Link to={"/order"} className="my-1 text-white hover:text-red-400">
            All Orders
          </Link>
        </div>

        {/* Contact Section */}
        <div className="mt-16 md:mt-0 md:basis-1/4">
          <h4 className="font-bold text-white">Contact Us</h4>
          <p className="my-5 text-white flex flex-row items-center">
            <div className="my-1 font-bold text-xl">
              <IoMailSharp />
            </div>{" "}
            <div className="ml-2 mb-1 bold text-lg">
              {" "}
              shivendratripathi1105@gmail.com
            </div>
          </p>
          <p className="my-1 text-white flex flex-row items-center">
            <div className="my-1 font-bold text-xl">
              <FaPhoneAlt />
            </div>{" "}
            <div className="ml-2 mb-1 bold text-lg">(+91) 6390669975</div>
          </p>
          {/* <p className="text-white">(333) 425-6825</p> */}

          {/* Social Media Icons Section */}
          <div className="flex justify-end mt-8 space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF
                className="text-white hover:text-blue-600 transition duration-300"
                size={24}
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram
                className="text-white hover:text-pink-500 transition duration-300"
                size={24}
              />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter
                className="text-white hover:text-blue-400 transition duration-300"
                size={24}
              />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedinIn
                className="text-white hover:text-blue-700 transition duration-300"
                size={24}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
