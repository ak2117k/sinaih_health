import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { PiGreaterThanLight } from "react-icons/pi";

const BestSellers = () => {
  const Settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: true,
        },
      },
    ],
  };

  const products = [
    {
      imgurl:
        "https://kaamrajcapsule.com/cdn/shop/files/WhatsApp_Image_2024-10-15_at_16.31.58.jpg?v=1728990293&width=990",
      name: "Kaamraj Capsule Box",
    },
    {
      imgurl:
        "https://kaamrajcapsule.com/cdn/shop/files/kaamraajgoldcapsules...png?v…",
      name: "Kaamraaj Gold",
    },
    {
      imgurl:
        "https://kaamrajcapsule.com/cdn/shop/files/Mughalquadiroil.png?v=171952…",
      name: "Mughal Quadir Oil",
    },
    {
      imgurl:
        "https://kaamrajcapsule.com/cdn/shop/files/time69.png?v=1719527855&width=990",
      name: "Time 69",
    },
  ];
  return (
    <div>
      <div className="flex justify-between mt-10 w-full ">
        <h1 className="text-2xl p-2 ml-10 font-semibold">Best Sellers</h1>
        <Link to="/medicines/Brahmanand">
          <button className="p-2 rounded-full text-white bg-gradient-to-r from-indigo-600 to-blue-500 flex justify-center items-center mr-4 w-10 sm:w-12 h-10 sm:h-12 mb-2 font-bold cursor-pointer hover:from-indigo-500 hover:to-blue-400 transition-all duration-300">
            <PiGreaterThanLight />
          </button>
        </Link>
      </div>
      {Settings && (
        <Slider {...Settings}>
          {products.map((item, index) => (
            <div
              className="w-full h-[240px] sm:h-[240px] md:h-[350px] lg:h-[420px] border-1 border-gray-200 rounded-md mx-4 shadow-lg p-4 mr-2 ml-2"
              key={index}
            >
              <Link
                to={`/products/${item.name
                  .split(" ")
                  .map((w) => w.trim())
                  .join("_")}`}
              >
                <img
                  className="w-full h-full object-cover rounded-md hover:translate-y-[-25px] transition-all ease-in-out duration-300"
                  src={item.imgurl}
                  alt={`Product ${index + 1}`}
                />
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default BestSellers;
