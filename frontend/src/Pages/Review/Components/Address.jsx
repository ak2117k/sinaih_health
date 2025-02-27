import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Address = () => {
  const address = useSelector((state) => state.checkout.selectedAddress);
  const buyNowAddress = useSelector((state) => state.buynowprod.address);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
      {/* Shipping Address Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 flex-col sm:flex-row">
          <h2 className="text-xl font-semibold text-gray-600 text-center sm:text-left">
            Shipping Address
          </h2>
          <Link to="/orders/checkout">
            <button className="text-blue-600 hover:text-blue-800 font-semibold mt-2 sm:mt-0">
              Change
            </button>
          </Link>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <div className="space-y-2 text-gray-500">
          <p>
            Name:{" "}
            <span className="font-medium text-gray-700">
              {address?.name || buyNowAddress?.name}
            </span>
          </p>
          <p>
            Mobile:{" "}
            <span className="font-medium text-gray-700">
              {address?.contactNumber || buyNowAddress?.contactNumber}
            </span>
          </p>
          <p>
            Address:{" "}
            <span className="font-medium text-gray-700">
              {address?.AreaoRLocality || buyNowAddress?.AreaoRLocality},{" "}
              {address?.flatNoOrBuildingNameAndStreetName ||
                buyNowAddress?.flatNoOrBuildingNameAndStreetName}
            </span>
          </p>
          <p>
            State/Province:{" "}
            <span className="font-medium text-gray-700 capitalize">
              {address?.state || buyNowAddress?.state}
            </span>
          </p>
          <p>
            City:{" "}
            <span className="font-medium text-gray-700 capitalize">
              {address?.city || buyNowAddress?.city}
            </span>
          </p>
          <p>
            Postal Code:{" "}
            <span className="font-medium text-gray-700">
              {address?.postalCode || buyNowAddress?.postalCode}
            </span>
          </p>
          <p>
            Country:{" "}
            <span className="font-medium text-gray-700 capitalize">
              {address?.country || buyNowAddress?.country}
            </span>
          </p>
        </div>
      </div>

      {/* Billing Address Section */}
      <div>
        <div className="flex justify-between items-center mb-4 flex-col sm:flex-row">
          <h2 className="text-xl font-semibold text-gray-600 text-center sm:text-left">
            Billing Address
          </h2>
          <Link to="/orders/checkout">
            <button className="text-blue-600 hover:text-blue-800 font-semibold mt-2 sm:mt-0">
              Change
            </button>
          </Link>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <div className="space-y-2 text-gray-500">
          <p>
            Name:{" "}
            <span className="font-medium text-gray-700">
              {address?.name || buyNowAddress?.name}
            </span>
          </p>
          <p>
            Mobile:{" "}
            <span className="font-medium text-gray-700">
              {address?.contactNumber || buyNowAddress?.contactNumber}
            </span>
          </p>
          <p>
            Address:{" "}
            <span className="font-medium text-gray-700">
              {address?.AreaoRLocality || buyNowAddress?.AreaoRLocality},{" "}
              {address?.flatNoOrBuildingNameAndStreetName ||
                buyNowAddress?.flatNoOrBuildingNameAndStreetName}
            </span>
          </p>
          <p>
            State/Province:{" "}
            <span className="font-medium text-gray-700 capitalize">
              {address?.state || buyNowAddress?.state}
            </span>
          </p>
          <p>
            City:{" "}
            <span className="font-medium text-gray-700 capitalize">
              {address?.city || buyNowAddress?.city}
            </span>
          </p>
          <p>
            Postal Code:{" "}
            <span className="font-medium text-gray-700">
              {address?.postalCode || buyNowAddress?.postalCode}
            </span>
          </p>
          <p>
            Country:{" "}
            <span className="font-medium text-gray-700 capitalize">
              {address?.country || buyNowAddress?.country}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Address;
