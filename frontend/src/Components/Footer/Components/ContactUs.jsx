import React from "react";

const ContactUs = () => {
  return (
    <div>
      <div className="">
        <h2 className="font-semibold text-gray-600">Contact US</h2>
      </div>
      <div className="mt-4">
        <span className="font-semibold">WhatsApp: +14378753944 </span>
      </div>
      <div className="mt-2">
        {" "}
        <span className="font-semibold">Email: </span>
        sinanihealth@gmail.com
      </div>
      <div className="w-60 mt-6 text-left">
        <h2 className="block text-xs">
          Please Contact only on WhatsApp and Email.
        </h2>
        <div className="text-xs">
          Kindy send your query via Email or WhatsApp.
          <br />
          We will respond as soon as possible. Thank you for the patience...{" "}
          <span></span>
        </div>
      </div>
      <div className="w-50 mt-6">
        <span className="font-semibold">Note :</span>
        Please Remember We are Not a Manufacturer or Manufacturers Companies
        Representative or Customer Care. We are Only Seller.
      </div>
      <div className="w-50 mt-2">
        <span className="font-semibold">Note :</span>
        "We are solely a seller. For consultations, please contact your
        preferred doctor."
      </div>
    </div>
  );
};

export default ContactUs;
