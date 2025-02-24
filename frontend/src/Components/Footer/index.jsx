import React from "react";
import AboutUS from "./Components/AboutUS";
import ContactUs from "./Components/ContactUs";
import CopyRightDes from "./Components/CopyRightDes";
import CustomerService from "./Components/CustomerService";
import Logo from "./Components/Logo";
import PayementAndShipping from "./Components/PaymentsAndShipping/index";
import SocialLinks from "./Components/SocialLinks";

const Index = () => {
  return (
    <div className="bg-[rgb(36,40,51)] mt-20">
      {/* Desktop Layout */}
      <div className="mt-10 bg-[rgb(241,230,216)] sm:hidden text-[#333333]">
        {" "}
        {/* Dark text for light background */}
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Left Column: Logo and SocialLinks */}
            <div className="flex flex-col items-center space-y-4">
              <Logo />
              <SocialLinks />
            </div>

            {/* Center Column: Payment and Shipping */}
            <div className="flex flex-col items-center space-y-6">
              <PayementAndShipping />
            </div>

            {/* Right Column: ContactUs, AboutUS, CustomerService */}
            <div className="flex flex-col space-y-8">
              <ContactUs />
              <AboutUS className="text-gray-800" />{" "}
              {/* Lighter text for About Us */}
              <CustomerService className="text-gray-800" />{" "}
              {/* Lighter text for Customer Service */}
            </div>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="bg-gray-800 text-white text-center py-4 mt-12">
          <CopyRightDes />
        </div>
      </div>

      {/* For Smaller Screens */}
      <div className="hidden sm:block text-white">
        {" "}
        {/* White text for dark background */}
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center space-y-6">
            {/* Logo and SocialLinks */}
            <div className="flex flex-col items-center space-y-4">
              <Logo />
              <SocialLinks />
            </div>

            {/* Payment and Shipping Section */}
            <div className="mt-8">
              <PayementAndShipping />
            </div>

            {/* Contact, About, and Customer Service */}
            <div className="space-y-6">
              <ContactUs />
              <AboutUS className="text-white" /> {/* White text for About Us */}
              <CustomerService className="text-white" />{" "}
              {/* White text for Customer Service */}
            </div>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="bg-gray-800 text-white text-center py-4 mt-8">
          <CopyRightDes />
        </div>
      </div>
    </div>
  );
};

export default Index;
