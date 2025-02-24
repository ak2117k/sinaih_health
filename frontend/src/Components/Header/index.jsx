import React from "react";
import TopHeader from "./Components/TopHeader";
import Main from "./Components/Main";

const index = () => {
  return (
    <div className="w-full">
      <div className="">
        <TopHeader />
      </div>
      <div className="">
        <Main />
      </div>
    </div>
  );
};

export default index;
