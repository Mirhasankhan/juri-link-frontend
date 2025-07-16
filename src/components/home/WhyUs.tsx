import Link from "next/link";
import bg1 from "../../assets/about.avif";
import { ImCheckmark } from "react-icons/im";

const WhyUs = () => {
  return (
    <div
      className="h-[320px] md:h-[500px] 2xl:h-[750px] mt-8 bg-cover bg-center flex"
      style={{ backgroundImage: `url(${bg1.src})` }}
    >
      <div className="h-full w-1/2 px-2 bg-black bg-opacity-60 flex justify-center items-center">
        <div className="flex flex-col gap-2 md:gap-4 w-fit text-left">
          <h1 className="md:text-xl uppercase text-primary font-semibold">
            Get Our Services
          </h1>
          <h1 className="text-xl md:text-3xl xl:text-5xl pb-2 md:pb-6 font-semibold text-white leading-snug">
            Get An Incredible Spa <br /> Experience with Glamvibe <br /> Spa
            Center
          </h1>
          <div className="flex text-white items-center gap-1 font-medium">
            <ImCheckmark />
            <p className="text-[10px] md:text-[14px]">5+ Years Of Experience In Beauty Services</p>
          </div>
          <div className="flex text-white items-center gap-1 font-medium">
            <ImCheckmark />
            <p className="text-[10px] md:text-[14px]">We Have Experienced Team Members</p>
          </div>
          <Link href="/book-appointment">
            <button className="bg-primary hidden md:block text-white rounded-xl md:px-6 px-3 py-2 w-fit">
              Book Appointment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
