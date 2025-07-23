const Banner = () => {
  return (
    <div className="relative w-full xl:h-[600px] h-[500px] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/video22.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="text-center absolute top-0 left-0 z-10 text-white h-full w-full flex flex-col items-center justify-center bg-black/40">
        <h1 className=" text-3xl lg:text-6xl font-bold">
          Find the Right Legal Expert for <br /> Your Needs
        </h1>
        <p className="mt-4 md:text-lg">
          Connect with qualified lawyers, post your legal requirements, and get
          expert <br /> legal assistance when you need it most.
        </p>
        <div className="flex gap-6 mt-4">
          <button className="bg-primary px-6 py-2 rounded-[4px] font-medium">Find Lawyers</button>
          <button className="bg-primary px-6 py-2 rounded-[4px] font-medium">Post You Request</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
