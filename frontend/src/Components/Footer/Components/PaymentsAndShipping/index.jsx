import React from "react";
import Visa from "./Payments/Visa";
import Upi from "./Payments/Upi";
import PayPal from "./Payments/PayPal";
import NetBanking from "./Payments/NetBanking";
import MasterCard from "./Payments/MasterCard";
import Mastero from "./Payments/Mastero";
import BankTransfer from "./Payments/BankTransfer";

import Delhivery from "./Shipping/Delhivery";
import Dhl from "./Shipping/Dhl";
import Dtdc from "./Shipping/Dtdc";
import Fedx from "./Shipping/Fedx";

const PaymentsAndShipping = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex items-center justify-center ml-20 mb-8">
        <hr className="flex-grow" />
        <span className="mx-4 font-semibold">Payments & Shipping</span>
        <hr className="flex-grow" />
      </div>

      {/* Payments Section */}
      <div className="w-full flex flex-wrap gap-6 justify-center mb-8">
        <div className="flex justify-center">
          <Visa />
        </div>
        <div className="flex justify-center">
          <Upi />
        </div>
        <div className="flex justify-center">
          <PayPal />
        </div>
        <div className="flex justify-center">
          <NetBanking />
        </div>
        <div className="flex justify-center">
          <MasterCard />
        </div>
        <div className="flex justify-center">
          <Mastero />
        </div>
        <div className="flex justify-center">
          <BankTransfer />
        </div>
      </div>

      {/* Shipping Section */}
      <div className="w-full flex flex-wrap gap-6 justify-center">
        <div className="flex justify-center">
          <Delhivery />
        </div>
        <div className="flex justify-center">
          <Dhl />
        </div>
        <div className="flex justify-center">
          <Dtdc />
        </div>
        <div className="flex justify-center">
          <Fedx />
        </div>
      </div>
    </div>
  );
};

export default PaymentsAndShipping;
