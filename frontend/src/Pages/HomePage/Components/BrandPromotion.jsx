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
    <div className="mt-8">
      <div className="flex justify-center items-center">
        <h2
          className={`text-2xl sm:text-lg md:text-2xl font-bold mt-4 transition-all duration-1000 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } bg-[rgb(227,229,228)] w-full flex items-center justify-center p-2`}
          ref={viewRef}
        >
          Kaamraj Capsule Box
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-6">
        {/* Left Column with Text */}
        <div className="w-full md:w-1/2 border-[0.5px] border-gray-50 rounded-md p-4 md:p-2 mx-4 md:ml-10 lg:ml-30">
          <h2
            className={`text-xl sm:text-lg md:text-xl font-semibold mb-4 transition-all duration-1000 ease-out ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } flex justify-start`}
          >
            BRAHMANAND KAAMRAJ CAPSULE BOX
          </h2>
          <div>
            <ul className="space-y-2">
              {[
                // List items with transition
                "BRAHMANAND KAAMRAJ CAPSULE BOX boosts vitality and enhances performance for men with its Ayurvedic formulation.",
                "BRAHMANAND KAAMRAJ CAPSULE BOX supports overall health, energy, and stamina, promoting a balanced lifestyle.",
                "BRAHMANAND KAAMRAJ CAPSULE BOX is made with traditional herbs, crafted to naturally improve male health and well-being.",
                "BRAHMANAND KAAMRAJ CAPSULE BOX helps revitalize the body, restoring energy and confidence.",
                "BRAHMANAND KAAMRAJ CAPSULE BOX promotes healthy circulation and supports reproductive health naturally.",
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
          <div className="mt-10">
            <Link to="/products/Kaamraj_Capsule_Box">
              <button className="hover:bg-amber-300 rounded-md flex items-center justify-center border-[1px] border-gray-500 w-full sm:w-auto p-2 cursor-pointer hover:scale-105 hover:translate-y-1 transition-all duration-200 ease-in-out">
                Buy Now
              </button>
            </Link>
          </div>
        </div>

        {/* Right Column with Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className={`transition-all duration-1000 ease-out ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } w-full md:w-[80%] lg:w-[70%] object-cover hover:scale-105 hover:translate-y-1 cursor-pointer`}
            src="https://kaamrajcapsule.com/cdn/shop/files/WhatsApp_Image_2024-10-15_at_16.31.58.jpg?v=1728990293&width=990"
            alt="BRAHMANAND KAAMRAJ CAPSULE BOX"
          />
        </div>
      </div>
    </div>
  );
};

export default BrandPromotion;
