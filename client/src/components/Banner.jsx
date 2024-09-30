import React from "react";
import bannerImg from "/images/home/banner.png";

const Banner = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center p"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="max-w-screen-2xl mx-auto xl:px-24 py-24 flex flex-col items-start justify-start gap-8">

        {/* texts */}
        <div className="md:w-1/2 px-8 space-y-7 text-white bg-opacity-50 rounded-lg md:ml-16 md:mt-16">
          <h2 className="md:text-8xl text-5xl font-bold md:leading-snug leading-snug">
            Her Lokmada <span className="text-green">Lezzet</span>
          </h2>
          <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
            Hemen Sipariş Et
          </button>
        </div>

      </div>
    </div>
  );
};

export default Banner;
