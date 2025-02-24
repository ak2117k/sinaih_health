import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DifferentProduct = () => {
  const [products, setProducts] = useState([]);
  const userWishlistedItems = useSelector(
    (state) => state.user?.user?.wishlistedItems
  );
  console.log(useSelector((state) => state.user.user));

  useEffect(() => {
    if (userWishlistedItems) {
      const differentProducts = userWishlistedItems.map(
        (item) => item.category
      );
      setProducts([...new Set(differentProducts)]);
    }
  }, [userWishlistedItems]);

  return (
    <div className="flex gap-2">
      {products.length > 0 &&
        products.map((category, index) => (
          <div
            className="m-2 p-2 border-1 border-gray-400 flex justify-center items-center rounded-md"
            key={index}
          >
            {category}
          </div>
        ))}
    </div>
  );
};

export default DifferentProduct;
