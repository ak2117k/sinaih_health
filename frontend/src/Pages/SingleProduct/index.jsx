import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerReviews from "./Components/CustomerReviews";
import Details from "./Components/Details";
import ImageCard from "./Components/ImageCard";
import Reviews from "./Components/Reviews";
import SimilarProductCont from "./Components/SimilarProductCont";

const index = () => {
  const params = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState(null);

  useEffect(() => {
    console.log("params", params.productName);

    const fetchSingleProduct = async () => {
      try {
        const result = await axios.get(
          `https://sinaih-health.vercel.app/api/product/${params.productName
            .split("_")
            .map((w) => w.trim())
            .join(" ")
            .trim(" ")}`,
          {}
        );
        if (result.status === 200) {
          setSingleProduct(result.data.result);
          setSimilarProducts(result.data.relatedProducts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleProduct();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [params.productName]);

  return (
    <>
      <div className=" hidden lg:block w-full p-4">
        <div className="hidden w-full lg:flex gap-6">
          <div className="w-[35%] ml-40  h-100">
            <ImageCard images={singleProduct?.images} />
          </div>
          <div className="w-[70%] h-auto ">
            <Details singleProduct={singleProduct} />
          </div>
        </div>
        <div className="ml-40">
          <CustomerReviews singleProduct={singleProduct} />
        </div>
        {singleProduct?.reviews?.length > 0 && (
          <div className="mt-6 ml-10 p-4">
            <Reviews singleProduct={singleProduct} />
          </div>
        )}
        <div className=" mt-10">
          <SimilarProductCont similarProducts={similarProducts} />
        </div>
      </div>

      {/* Mobile and Tablet Layout (sm, md screens) */}

      <div className="lg:hidden w-full">
        <div className="w-full flex justify-center mb-6">
          <ImageCard images={singleProduct?.images} />
        </div>
        <div className="w-full flex justify-center">
          <Details singleProduct={singleProduct} />
        </div>
        <div className="">
          <CustomerReviews singleProduct={singleProduct} />
        </div>
        <div className=" mt-10">
          <SimilarProductCont similarProducts={similarProducts} />
        </div>
      </div>
    </>
  );
};

export default index;
