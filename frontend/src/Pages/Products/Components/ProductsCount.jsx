import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ProductsCount = ({ ProductsCount }) => {
  const params = useParams();
  const location = useLocation();
  return (
    <div>
      <div className="p-2 font-semibold text-gray-600 text-xl mt-2 capitalize">
        {params?.brand
          ? params.brand
          : location.search
          ? location.search.split("=")[1]
          : "Total Product"}{" "}
        {ProductsCount}
      </div>
    </div>
  );
};

export default ProductsCount;
