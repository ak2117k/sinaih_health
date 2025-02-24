import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="">
      <h1 className="text-xl font-bold mb-4">
        My Medicines{" "}
        <span className="text-gray-600 font-[20px] text-[15px] pb-2">
          (
          {user?.myCart?.length > 0
            ? `${user?.myCart[0].items?.length} items`
            : ""}
          )
        </span>
      </h1>
    </div>
  );
};

export default Header;
