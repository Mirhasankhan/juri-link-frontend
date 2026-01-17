"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";

const NewCard = ({ lawyer }: { lawyer: any }) => {
  return (
    <div className="bg-secondary p-5 relative flex flex-col rounded-[6px]">
      <Image
        src={lawyer?.profileImage || "/placeholder.png"}
        width={400}
        height={400}
        alt={lawyer.fullName || "lawyer"}
        className="h-[270px] w-full object-cover rounded-[12px]"
      />
      <div className="flex absolute top-[240px] px-4 py-0.5 rounded-full right-8 text-white bg-primary items-center gap-1">
        <FaStar />
        <h1>{lawyer?.avgRating}</h1>
      </div>
      <p className="text-2xl font-medium py-3 text-white">{lawyer?.fullName}</p>
      <div className="grid grid-cols-2 gap-2  my-2">
        {lawyer?.legalServices?.map(
          (service: { _id: string; serviceName: string }) => (
            <div
              key={service._id}
              className="rounded-[8px] text-white text-center bg-white/10 font-medium text-xs px-1 py-1 border border-gray-300"
            >
              {service.serviceName}
            </div>
          ),
        )}
      </div>

      <Link href={`/lawyers/${lawyer._id}`} className="mt-auto w-full">
        <button className="bg-primary w-full py-2 rounded-[4px] text-white font-medium">
          View Profile
        </button>
      </Link>
    </div>
  );
};

export default NewCard;
