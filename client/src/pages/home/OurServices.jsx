import React from "react";

const serviceLists = [
    {id:1, title: "İkram", des: "Misafirlerinizi lezzetlerimiz ve sunumlarımızla şımartın.", img: "/images/home/services/icon1.png"},
    {id:2, title: "Hızlı Teslimat", des: "Siparişinizi kapınıza zamanında teslim ediyoruz", img: "/images/home/services/icon2.png"},
]

const OurServices = () => {
  return (
    <div className="section-container my-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Hikayemiz ve Hizmetlerimiz</p>
            <h2 className="title">Gastronomi Yolculuğumuz ve Hizmetlerimiz</h2>


            <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
              Keşfet
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
                {
                    serviceLists.map((service) => (
                        <div key={service.id} className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border hover:border-indigo-600 transition-all duration-200">
                            <img src={service.img} alt="" className=" mx-auto"/>
                            <h5 className="pt-3 font-semibold"> {service.title}</h5>
                            <p className="text-[#90BD95]">{service.des}</p>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;