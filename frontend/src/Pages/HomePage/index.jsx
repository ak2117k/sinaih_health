import React from "react";
import Carousel from "./Components/Carousel";
import FeaturedProducts from "./Components/FeaturedProducts";
import SinaiHealthAim from "./Components/SinaiHealthAim";
import BrandPromotion from "./Components/BrandPromotion";
import IgVideos from "./Components/IgVideos";
import BrandPromotion2 from "./Components/BrandPromotion2";
import BestSellers from "./Components/BestSellers";

const index = () => {
  return (
    <div className="">
      <div className="">
        <Carousel />
      </div>
      <div className="">
        <FeaturedProducts />
      </div>
      <div className="">
        <SinaiHealthAim />
      </div>
      <div className="">
        <BestSellers />
      </div>
      <div className="">
        <BrandPromotion />
      </div>
      <div className="">
        <IgVideos />
      </div>
      <div className="">
        <BrandPromotion2 />
      </div>
    </div>
  );
};

export default index;
