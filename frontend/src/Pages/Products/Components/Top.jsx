import React from "react";

const Top = () => {
  return (
    <div className="">
      <div className="flex flex-col md:flex-row items-center justify-between p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-[rgb(135,164,2)]">
            Sinani Health
          </h1>
        </div>
        <select className="mt-4 md:mt-0 p-2 bg-gray-100 border rounded-md">
          <option value="default">Sort By: Default</option>
          <option value="price">Price</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
      <div className="mt-2">
        <img
          src="https://img.freepik.com/free-vector/sandalwood-realistic-colored-composition-consisting-bottle-with-oil-bowl-with-powder-tree-branches-vector-illustration_1284-80582.jpg"
          className="h-80 w-80 rounded-md"
        ></img>
      </div>
    </div>
  );
};

export default Top;
