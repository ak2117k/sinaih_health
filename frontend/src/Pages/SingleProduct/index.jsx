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
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    console.log("params", params.productName);

    const fetchSingleProduct = async () => {
      try {
        setLoader(true);
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
          setLoader(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
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
      {loader && (
        <div className="w-full h-screen flex justify-center items-center bg-gray-200 opacity-80 fixed top-0 left-0 z-50">
          <img
            className="w-24 sm:w-32 md:w-48 lg:w-64"
            src="https://cdn.dribbble.com/userupload/33909998/file/original-ba7efaee5c6539cd0b51f0dedd8e50e1.gif"
            alt="Loading..."
          />
        </div>
      )}

      {!loader && (
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
      )}

      {/* Mobile and Tablet Layout (sm, md screens) */}
      {!loader && (
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
      )}
    </>
  );
};

export default index;
