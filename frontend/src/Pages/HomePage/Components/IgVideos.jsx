import React from "react";

const IgVideos = () => {
  const links = [
    "C:/Users/91870/Downloads/5738272-uhd_3840_2160_30fps.mp4",
    "C:/Users/91870/Downloads/5738272-uhd_3840_2160_30fps.mp4",
    "C:/Users/91870/Downloads/5738272-uhd_3840_2160_30fps.mp4",
    "C:/Users/91870/Downloads/5738272-uhd_3840_2160_30fps.mp4",
    "C:/Users/91870/Downloads/5738272-uhd_3840_2160_30fps.mp4",
    "C:/Users/91870/Downloads/5738272-uhd_3840_2160_30fps.mp4",
  ];

  return (
    <div className="w-full mt-10">
      <div
        className="flex gap-8 overflow-x-auto scrollbar-hide p-2"
        style={{ scrollBehavior: "smooth" }}
      >
        {links.map((link, index) => {
          return (
            <div
              key={index}
              className="video-container rounded-md border-2 border-amber-200 p-2 flex-shrink-0 sm:min-h-[270px] md:min-h-[300px] lg:min-h-[450px] sm:w-[50%] md:w-[33%] lg:w-[25%] shadow-md"
            >
              <video
                width="100%"
                height="100%"
                controls
                autoPlay
                muted
                loop
                className="rounded-md shadow-2xs object-cover w-full h-full"
              >
                <source src={link} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IgVideos;
