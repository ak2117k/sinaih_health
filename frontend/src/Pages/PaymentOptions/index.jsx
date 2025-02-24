import React from "react";
import OrderSummary from "./Components/OrderSummary";
import CheckoutStatus from "../../Components/PaymentStatus";
import { useSelector } from "react-redux";
import ShippingOptions from "./Components/ShippingOptions";
import PaymentOptions from "./Components/PaymentOptions";
import { Link } from "react-router-dom";

const index = () => {
  const shippingType = useSelector((state) => state.checkout.shippingOption);
  const paymentType = useSelector((state) => state.checkout.PaymentType);

  console.log(shippingType, paymentType);

  return (
    <>
      <div className="hidden w-full lg:flex gap-4">
        {/* Main Content */}
        <div className="w-[70%]">
          <div className="ml-60">
            <CheckoutStatus />
          </div>
          <div className="ml-60">
            <ShippingOptions />
          </div>
          <div className="ml-60">
            <PaymentOptions />
          </div>

          {/* Continue Button */}
          <div className="w-full flex items-center justify-end mt-12">
            <Link to="/orders/review">
              <button
                className={`p-2 cursor-pointer text-white w-40 bg-[rgb(135,164,2)]  hover:bg-green-600  transition-all ease-in-out`}
              >
                Continue
              </button>
            </Link>
          </div>
        </div>

        {/* Sidebar for Order Summary */}
        <div className="w-[30%]">
          <div className="p-4">
            <OrderSummary />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-6 px-4 lg:hidden">
        {/* Main Content */}
        <div className="w-full">
          <div className="mb-6">
            <CheckoutStatus />
          </div>
          <div className="mb-6">
            <ShippingOptions />
          </div>
          <div className="mb-6">
            <PaymentOptions />
          </div>

          {/* Continue Button */}
          <div className="w-full flex items-center justify-end mt-12">
            <Link to="/orders/review">
              <button
                className={`p-2 cursor-pointer text-white w-40 bg-[rgb(135,164,2)] hover:bg-green-600 transition-all ease-in-out`}
              >
                Continue
              </button>
            </Link>
          </div>
        </div>

        {/* Sidebar for Order Summary */}
        <div className="w-full p-4 mt-8">
          <OrderSummary />
        </div>
      </div>
    </>
  );
};

export default index;
