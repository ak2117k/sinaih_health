import React from "react";
import { useState, useEffect } from "react";

const MainImage = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (images && images.length > 0) setSelectedImage(images[0]);
  }, [images]);

  return (
    <div className="w-full h-full flex justify-center sm:w-full md:w-3/4 lg:w-[96%] p-4  items-center transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:scale-105">
      <img
        className="w-[96%] h-full object-cover shadow-lg"
        src={selectedImage}
        alt="Selected Image"
      />
    </div>
  );
};

export default MainImage;
