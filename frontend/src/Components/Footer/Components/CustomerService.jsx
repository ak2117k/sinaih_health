import React from "react";

const CustomerService = () => {
  return (
    <div className="">
      <div className="font-semibold text-gray-600">Customer Service</div>
      <div className="cursor-pointer text-gray-700 hover:bg-gray-200  rounded-md transition-all duration-300 ease-in-out">
        Payment Method
      </div>
      <div className="cursor-pointer text-gray-700 hover:bg-gray-200 rounded-md transition-all duration-300 ease-in-out">
        Contact Us
      </div>
      <div className="cursor-pointer text-gray-700 hover:bg-gray-200  rounded-md transition-all duration-300 ease-in-out">
        Shipping Policy
      </div>
      <div className="cursor-pointer text-gray-700 hover:bg-gray-200  rounded-md transition-all duration-300 ease-in-out">
        Refund Policy
      </div>
      <div className="cursor-pointer text-gray-700 hover:bg-gray-200  rounded-md transition-all duration-300 ease-in-out">
        Cancellation Policy
      </div>
      <div className="cursor-pointer text-gray-700 hover:bg-gray-200  rounded-md transition-all duration-300 ease-in-out">
        Track Order
      </div>
    </div>
  );
};

export default CustomerService;
