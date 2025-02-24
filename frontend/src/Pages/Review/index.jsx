import React from "react";
import Address from "./Components/Address";
import Main from "./Components/Main";
import CheckoutStatus from "../../Components/PaymentStatus";

const index = () => {
  return (
    <>
      <div className="hidden lg:flex gap-4">
        <div className="w-[70%]">
          <div className="ml-60">
            <CheckoutStatus />
          </div>
          <div className="">
            <Main />
          </div>
        </div>
        <div className="w-[30%]">
          <Address />
        </div>
      </div>

      <div className="lg:hidden flex flex-col gap-4 p-4">
        {/* Main content (full width on small and medium screens) */}
        <div className="mb-6">
          <CheckoutStatus />
        </div>
        <div className="w-full">
          <Main />
        </div>

        {/* Address content (full width on small and medium screens) */}
        <div className="w-full">
          <Address />
        </div>
      </div>
    </>
  );
};

export default index;
