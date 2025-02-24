import React from "react";

const CopyRightDes = () => {
  return (
    <div className="flex gap-4 bg-white p-2 items-center mt-2">
      <div className="text-xs text-gray-500 font-semibold cursor-pointer ml-6">
        Copyright © 2025 SinaniHealth
      </div>
      <div className="text-gray-500 text-xs font-semibold cursor-pointer">
        All rights reserved
      </div>
      {/* <div className="text-xs cursor-pointer">Terms & condition.</div>
      <div className="text-xs cursor-pointer">All rights reserved.</div>
      <div className="text-xs cursor-pointer">Terms & Condition</div>
      <div className="text-gray-500 cursor-pointer">|</div>
      <div className="text-xs cursor-pointer">Privacy Policy</div>
      <div className="text-gray-500 cursor-pointer">|</div>
      <div className="text-xs cursor-pointer">Disclaimer</div> */}
    </div>
  );
};

export default CopyRightDes;
