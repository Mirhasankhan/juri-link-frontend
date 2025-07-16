import { AlarmClock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa6";

const Card = ({ service }: { service: any }) => {
  console.log(service);
  return (
    <div key={service.id} className="p-2 rounded-[4px] shadow-xl">
      {/* <Image
        className="object-cover h-[300px] w-full rounded-[4px]"
        src={service.imageUrls[0]}
        width={400}
        height={300}
        alt=""
      ></Image> */}
      <div className="relative w-full h-[300px] overflow-hidden">
        <Image
          src={service.imageUrls[0]}
          alt="service"
          fill
          className="object-cover"
          quality={100}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-2">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            <FaStar className="text-orange-300"></FaStar>
            <h1 className="font-medium">{service?.avgRating}</h1>
          </div>
          <h1>({service?.review?.length} reviews)</h1>
        </div>
        <p className="text-xl py-1">{service.serviceName}</p>
        <div className="flex justify-between items-center">
          <p className="font-medium">${service.price}</p>
          <div className="flex gap-1 items-center">
            <AlarmClock size={15}></AlarmClock>
            <p>1 hours</p>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <Link className="w-full" href={`/services/${service.id}`}>
            <button className="bg-blue-500 font-medium text-white w-full py-2 rounded-[4px]">
              View Details
            </button>
          </Link>
          <Link className="w-full" href={`/book-appointment`}>
            <button className="bg-primary font-medium text-white w-full py-2 rounded-[4px]">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
