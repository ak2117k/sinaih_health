import React, { useState } from "react";
import Product from "./Components/Product";
import User from "./Components/User";
import Bookings from "./Components/Bookings";
import BuyNowBookings from "./Components/BuyNowBookings";
import Payments from "./Components/Payments";

const index = () => {
  const [activeTab, setActiveTab] = useState("Product");

  const renderComponent = () => {
    switch (activeTab) {
      case "Product":
        return <Product />;
      case "User":
        return <User />;
      case "Bookings":
        return <Bookings />;
      case "BuyNowBookings":
        return <BuyNowBookings />;
      case "Payments":
        return <Payments />;
      default:
        return <Product />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="flex space-x-4 mb-4">
        {["Product", "User", "Bookings", "BuyNowBookings", "Payments"].map(
          (tab) => (
            <button
              key={tab}
              className={`p-2 rounded-lg ${
                activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          )
        )}
      </div>

      <div className="w-full max-w-7xl">{renderComponent()}</div>
    </div>
  );
};

export default index;
