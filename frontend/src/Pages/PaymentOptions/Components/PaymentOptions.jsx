import React, { useState, useEffect } from "react";
import { FaPaypal } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setPaymentType } from "../../../Store/Checkout";

const PaymentOptions = () => {
  const [selectedPayment, setSelectedPayment] = useState("paypal");
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the selected payment type when it changes
    dispatch(setPaymentType(selectedPayment));
  }, [selectedPayment, dispatch]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Payment Options
      </h2>
      <div className="flex flex-col sm:flex-row gap-6">
        {/* PayPal Option */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="radio"
            value="paypal"
            id="paypal"
            checked={selectedPayment === "paypal"}
            onChange={() => setSelectedPayment("paypal")}
            className="hidden"
          />
          <label
            htmlFor="paypal"
            className={`flex items-center cursor-pointer p-4 border rounded-lg transition-all ${
              selectedPayment === "paypal" ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <FaPaypal className="w-6 h-6 mr-3 text-blue-600" />
            PayPal
          </label>
        </div>
      </div>
      <p className="mt-4 text-gray-600">
        Selected Payment Method:{" "}
        <span className="font-bold">{selectedPayment}</span>
      </p>
    </div>
  );
};

export default PaymentOptions;
