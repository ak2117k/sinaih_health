import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setShippingOptions } from "../../../Store/Checkout";

const ShippingOptions = () => {
  const dispatch = useDispatch();
  const [shippingType, setShippingType] = useState("standard");

  const handleShippingOption = (type) => {
    setShippingType(type);
    dispatch(setShippingOptions(type));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h1 className="font-semibold text-lg text-gray-800 mb-4">
        Shipping Options
      </h1>
      <div className="flex gap-6 flex-wrap">
        {/* Standard Shipping Option */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="radio"
            name="shipping"
            onChange={() => handleShippingOption("standard")}
            checked={shippingType === "standard"}
            id="standard"
            className="hidden"
          />
          <label
            htmlFor="standard"
            className={`flex items-center cursor-pointer p-4 border rounded-lg transition-all ${
              shippingType === "standard" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            Standard
          </label>
        </div>

        {/* Fast Shipping Option */}
        {/* <div className="flex items-center gap-2 w-full sm:w-auto">
        <input
          type="radio"
          name="shipping"
          onChange={() => handleShippingOption("fast")}
          checked={shippingType === "fast"}
          id="fast"
          className="hidden"
        />
        <label
          htmlFor="fast"
          className={`flex items-center cursor-pointer p-4 border rounded-lg transition-all ${
            shippingType === "fast" ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          Fast
        </label>
      </div> */}
      </div>
      <p className="mt-4 text-gray-600">
        Selected Shipping Method:{" "}
        <span className="font-bold">{shippingType}</span>
      </p>
    </div>
  );
};

export default ShippingOptions;
