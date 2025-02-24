import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import KammraajBanner from "../../../assets/KaamraajBanner.png";
import { Link } from "react-router-dom";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1, // default for all screen sizes
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, // Tablet screens and above
        settings: {
          slidesToShow: 1, // Show 1 slide on tablet
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // Mobile screens and above
        settings: {
          slidesToShow: 1, // Show 1 slide on smaller screens
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480, // Very small screens
        settings: {
          slidesToShow: 1, // Show 1 slide on very small screens
          slidesToScroll: 1,
          dots: true, // Optionally, you can disable dots for very small screens
        },
      },
    ],
  };

  const items = [
    {
      url: "https://cdn.shopaccino.com/rabbaniunani/slideshows/banner1-532243_l.png?v=521?v=1",
      brand: "New Shama",
    },
    {
      url: "https://aayushbharat.com/shop/images/promo/3/AayushBharat_HeroCarousel_ayurveda__1_.jpg",
      brand: "",
    },
    {
      url: KammraajBanner,
      brand: "Brahmanand",
    },
  ];

  // const items = ["", "", ,];

  return (
    <div>
      {/* Ensure settings is correctly passed to Slider */}
      {settings && (
        <Slider {...settings}>
          {items.map((item, index) => (
            <div
              className=" w-full sm:h-[200px] md:h-[300px] lg:h-[400px] "
              key={index}
            >
              <Link
                to={
                  item.brand !== "" ? `/medicines/${item.brand}` : `/medicines`
                }
              >
                <img
                  className="rounded-md shadow-lg object-cover w-full h-full "
                  src={item.url}
                  alt={`item${index + 1}`}
                />
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Carousel;
