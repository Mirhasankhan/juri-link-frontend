import React from "react";

const Banner = () => {
  return (
    <div className="py-16 px-6 md:px-16">
      <h1 className="text-3xl md:text-5xl xl:text-7xl text-white font-semibold">Career With</h1>
      <div className="flex items-center gap-4 pt-3 text-3xl md:text-5xl xl:text-7xl font-semibold ">
        <h1 className="h-4 w-8 md:w-16 bg-yellow-500"></h1>
        <h1 className="text-yellow-500">Glamvibe Spa Center</h1>
      </div>
      <p className="md:text-xl font-medium text-white py-5">
        Looking for a career that&apos;s all about making, shaping, and <br />
        celebrating the extraordinary? then you are home!
      </p>
      <button className="bg-primary py-3 font-medium text-white px-12 rounded-full">Join Our Team</button>
    </div>
  );
};

export default Banner;
