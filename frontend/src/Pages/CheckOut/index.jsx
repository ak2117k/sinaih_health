import React from "react";
import OrderSummary from "./Components/OrderSummary";
import Address from "./Components/Address";
import CheckoutStatus from "../../Components/PaymentStatus";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const index = () => {
  const selectedAddress = useSelector(
    (state) => state.checkout.selectedAddress
  );
  const buyNowAddress = useSelector((state) => state.buynowprod.address);
  console.log(selectedAddress);
  console.log(buyNowAddress);

  return (
    <>
      <div className="hidden w-full lg:flex gap-4">
        <div className="w-[70%]">
          <div className="ml-60">
            <CheckoutStatus />
          </div>
          <div className="ml-60">
            <Address />
          </div>
          <div className="w-full flex items-center justify-center mt-12">
            <Link to="/orders/payments">
              <button
                className={`p-2 cursor-pointer text-white w-40 ${
                  selectedAddress === null && buyNowAddress === null
                    ? "bg-gray cursor-not-allowed"
                    : "bg-[rgb(135,164,2)]"
                }`}
                style={{
                  backgroundColor:
                    selectedAddress !== null && selectedAddress
                      ? "rgb(135,164,2)"
                      : "gray",
                }}
                disabled={selectedAddress === null && buyNowAddress === null}
              >
                Continue
              </button>
            </Link>
          </div>
        </div>
        <div className="w-[30%]">
          <div className="p-4">
            <OrderSummary />
          </div>
        </div>
      </div>

      <div className="lg:hidden w-full p-4">
        {/* Mobile and Tablet Layout (Stacked vertically) */}
        <div className="block ">
          {/* Left Section for Mobile and Tablet (Stacked vertically) */}
          <div className="w-full flex flex-col gap-8">
            {/* Checkout Status */}
            <div className="flex justify-center">
              <CheckoutStatus />
            </div>

            {/* Address Form */}
            <div className="flex justify-center">
              <Address />
            </div>

            <div className="flex justify-center">
              <OrderSummary />
            </div>

            {/* Continue Button */}
            <div className="w-full flex justify-center mt-12">
              <Link to="/orders/payments">
                <button
                  className={`p-2 cursor-pointer text-white w-40 ${
                    selectedAddress === null && buyNowAddress === null
                      ? "bg-gray cursor-not-allowed"
                      : "bg-[rgb(135,164,2)]"
                  }`}
                  style={{
                    backgroundColor:
                      selectedAddress !== null && selectedAddress
                        ? "rgb(135,164,2)"
                        : "gray",
                  }}
                  disabled={selectedAddress === null && buyNowAddress === null}
                >
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
