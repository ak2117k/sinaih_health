import React from "react";

const InfoImg = () => {
  return (
    <div className="relative">
      <img
        className="w-full h-full object-cover "
        src="https://montareoutpatient.com/wp-content/uploads/2023/07/Man-who-practices-all-of-these-characteristics-of-a-mentally-healthy-person-768x700.jpg.webp"
      ></img>
      <p className="absolute z-10 top-50 left-2 text-lg font-semibold">
        At Sinai Health, we are committed to bringing you the best of Ayurveda
        to support your wellness journey.
      </p>
    </div>
  );
};

export default InfoImg;
