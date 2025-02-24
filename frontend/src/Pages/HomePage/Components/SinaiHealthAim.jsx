import React, { useEffect, useRef, useState } from "react";

const SinaiHealthAim = () => {
  const [inView, setInView] = useState(false);
  const aimRef = useRef(null);

  // Intersection Observer callback to track if the component is in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true); // Trigger animation when in view
          observer.unobserve(aimRef.current); // Stop observing after the component is in view
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    if (aimRef.current) {
      observer.observe(aimRef.current);
    }

    return () => {
      if (aimRef.current) {
        observer.unobserve(aimRef.current); // Clean up the observer on component unmount
      }
    };
  }, []);

  return (
    <div
      className={`${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } transition-all duration-1000 ease-out delay-100 mt-12 text-black h-auto`}
      ref={aimRef}
    >
      <div className="flex items-center justify-center">
        <h1 className="text-3xl sm:text-2xl md:text-3xl font-semibold mb-6 text-center text-black">
          Our Aim at SinaniHealth
        </h1>
      </div>
      <div className="space-y-4 p-4">
        <p
          className={`${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } transition-all duration-1000 ease-out delay-200 w-full text-center text-black font-medium text-sm sm:text-xs md:text-base lg:text-lg leading-relaxed`}
        >
          At SinaniHealth, we are committed to bringing you the best of Ayurveda
          to support your wellness journey.
        </p>
        <p
          className={`${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } transition-all duration-1000 ease-out delay-300 w-full text-center text-black font-medium text-sm sm:text-xs md:text-base lg:text-lg leading-relaxed`}
        >
          Our aim is to provide natural, effective, and sustainable Ayurvedic
          products that enhance your physical and mental well-being.
        </p>
        <p
          className={`${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } transition-all duration-1000 ease-out delay-400 w-full text-center text-black font-medium text-sm sm:text-xs md:text-base lg:text-lg leading-relaxed`}
        >
          We believe in empowering individuals with holistic solutions for a
          healthier, balanced life.
        </p>
      </div>
    </div>
  );
};

export default SinaiHealthAim;
