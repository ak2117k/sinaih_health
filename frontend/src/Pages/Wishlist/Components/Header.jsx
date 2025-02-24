import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="">
      <div className="">
        <h2 className="font-semibold text-lg">
          Hello {user?.profile?.firstName} {user?.profile?.lasttName}
          <span className="">({user?.profile?.email})</span>
        </h2>
        <h2 className="text-md text-gray-500 font-semibold">
          My Wishlist{" "}
          <span className="text-sm">
            {user?.wishlistedItems > 0 ? `${user?.wishlistedItems} items` : ""}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Header;
