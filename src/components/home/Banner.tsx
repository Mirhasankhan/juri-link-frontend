import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative w-full xl:h-[600px] 2xl:h-[800px] h-[500px] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/video22.mp4" type="video/mp4" />
        Your browser does not support te video tag.
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
          <Link href="/lawyers">           
            <button className="bg-primary px-6 py-2 rounded-[4px] font-medium">
              Find Lawyers
            </button>
          </Link>
         <Link href="/create-post"> <button className="bg-primary px-6 py-2 rounded-[4px] font-medium">
            Post Your Request
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default Banner