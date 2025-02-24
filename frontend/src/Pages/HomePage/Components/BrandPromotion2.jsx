import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const BrandPromotion = () => {
  const [inView, setInView] = useState(false);
  const viewRef = useRef(null);

  // Intersection Observer to track when the component enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(viewRef.current);
        }
      },
      { threshold: 0.3 }
    );

    if (viewRef.current) {
      observer.observe(viewRef.current);
    }

    return () => {
      if (viewRef.current) {
        observer.unobserve(viewRef.current);
      }
    };
  }, []);

  return (
    <div className="p-2 mb-8">
      <div className="flex justify-center items-center">
        <h2
          className={`text-2xl sm:text-lg font-bold mt-4 transition-all duration-1000 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } w-full flex items-center justify-center p-2`}
          ref={viewRef}
        >
          Brahmanand Kaamraaj Gold
        </h2>
      </div>

      {/* Flex container with equal-width columns */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:justify-between">
        {/* Left Column with Text */}
        <div className="w-full sm:w-1/2 p-2 sm:ml-10 sm:bg-gray-100 sm:rounded-md">
          <h2
            className={`text-xl sm:text-xl font-semibold mb-4 transition-all duration-1000 ease-out ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } sm:ml-20`}
          >
            MEN'S POWER BOOSTER
          </h2>
          <div className="sm:ml-30">
            <ul className="space-y-2">
              {/* List items with transition */}
              {[
                "KAAMRAAJ GOLD CAPSULE helps in increasing healthy blood flow, promoting overall well-being.",
                "KAAMRAAJ GOLD CAPSULE aids in curing weakness caused by mobile phone radiations.",
                "KAAMRAAJ GOLD CAPSULE supports the recovery of 6,666 vital veins of the male organ for enhanced vitality.",
                "KAAMRAAJ GOLD CAPSULE helps restore energy levels and supports a healthy lifestyle.",
                "KAAMRAAJ GOLD CAPSULE enhances stamina and strength, improving male performance naturally.",
                "Manufactured under expert Ayurvedic supervision with GMP-certified technology.",
              ].map((item, index) => (
                <li
                  key={index}
                  className={`list-disc pl-5 transition-all duration-1000 ease-out ${
                    inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }} // Stagger the transition delay for each li item
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Link to="/products/Kaamraaj Gold">
              <button className="hover:bg-amber-300 rounded-md flex items-center justify-center border-[1px] border-gray-500 sm:ml-20 p-2 mt-10 cursor-pointer hover:scale-105 hover:translate-y-1 transition-all duration-200 ease-in-out">
                Buy Now
              </button>
            </Link>
          </div>
        </div>

        {/* Right Column with Image (Large Image) */}
        <div className="w-full sm:w-1/2 sm:flex sm:justify-center sm:items-center sm:ml-10 sm:mr-4">
          <div className="bg-gray-100 rounded-md flex justify-center items-center">
            <img
              className={`transition-all duration-1000 ease-out ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              } h-auto sm:h-[350px] lg:h-[500px] xl:h-[550px] w-full object-cover sm:object-contain hover:scale-105 hover:translate-y-1 cursor-pointer`}
              src="https://kaamrajcapsule.com/cdn/shop/files/KaamraajsingleCapsule.png?v=1719540632&width=990"
              alt="TIME 69"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandPromotion;
