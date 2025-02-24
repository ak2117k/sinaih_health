import React from "react";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaGooglePlus } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

const SocialLinks = () => {
  return (
    <div className="flex gap-2">
      <div className=" bg-[rgb(59,89,152)] rounded-full p-2 text-white cursor-pointer">
        <FaFacebook />
      </div>
      <div className="bg-[rgb(193,53,132)] rounded-full p-2 text-white cursor-pointer">
        <BsInstagram />
      </div>
      <div className="bg-[rgb(230,69,54)] rounded-full p-2 text-white cursor-pointer">
        <FaGooglePlus />
      </div>
      <div className="bg-black text-white rounded-full p-2 cursor-pointer">
        <BsTwitterX />
      </div>
    </div>
  );
};

export default SocialLinks;
