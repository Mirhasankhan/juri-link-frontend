"use client";

import { useServicesQuery } from "@/redux/features/services/services.api";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Banner = () => {
  const { data: legalServies } = useServicesQuery("");
  const router = useRouter();

  const handleBook = (id: string) => {
    router.push(`/lawyers?serviceId=${id}`);
  };
  return (
    <div className="relative w-full xl:h-[600px] 2xl:h-[900px] z-20 h-[500px] overflow-hidden">
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
          expert <br /> legal assistance when you need it most.ff
        </p>
        <input
          className="border text-black w-2/4 py-4 pl-6 rounded-xl mt-6"
          type="text"
          placeholder="Search for any service"
          name=""
          id=""
        />
        <div className="hidden lg:flex gap-6 mt-6">
          {legalServies?.data?.slice(0,4).map(
            (service: { serviceName: string; _id: string }) => (
              <button
                onClick={() => handleBook(service._id)}
                className="bg-white border border-white bg-opacity-10 flex items-center gap-2 font-semibold text-xl px-4 py-2 rounded-[6px]"
                key={service._id}
              >
                {service?.serviceName} <MoveRight size={15} />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
