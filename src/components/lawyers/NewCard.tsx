"use client";

import { JWTDecode } from "@/utils/jwt";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa6";

const NewCard = ({ lawyer }: { lawyer: any }) => {
  const { decoded } = JWTDecode();
  const router = useRouter();

  const handleMessage = () => {
    if (!decoded?.email) return router.push(`/auth/login`);
    router.push(`/messages?receiverId=${lawyer._id}`);
  };
  return (
    <div className="bg-white p-5 relative flex flex-col rounded-[10px]">
      <Image
        src={lawyer?.profileImage || "/placeholder.png"}
        width={400}
        height={400}
        alt={lawyer.fullName || "lawyer"}
        className="h-[270px] w-full object-cover rounded-[12px]"
      />
      <div className="flex absolute top-[240px] px-3 py-0.5 rounded-full right-8 text-white bg-primary items-center gap-1">
        <FaStar />
        <h1>{lawyer?.avgRating}</h1>
      </div>
      <p className="text-2xl font-medium pt-3">{lawyer?.fullName}</p>
      <h1 className="text-gray-700 pb-2">
        {lawyer?.serviceType == "Both"
          ? "Online & In Person"
          : lawyer.serviceType == "Online"
            ? "Online"
            : "In Person"}{" "}
        Consultation
      </h1>
      <div className="grid grid-cols-2 gap-2  my-2">
        {lawyer?.legalServices?.map(
          (service: { _id: string; serviceName: string }) => (
            <div
              key={service._id}
              className="rounded-[8px] text-gray-600 text-center font-medium text-xs px-1 py-1 border border-gray-300"
            >
              {service.serviceName}
            </div>
          ),
        )}
      </div>

      <div className="grid mt-auto grid-cols-4 gap-2">
        <Link href={`/lawyers/${lawyer._id}`} className="col-span-3 w-full">
          <button className="bg-primary w-full py-2 rounded-[8px] text-white font-medium">
            View Profile
          </button>
        </Link>
        <button
          onClick={handleMessage}
          className="bg-gray-100 text-gray-500 text-center col-span-1  w-full py-1 rounded-[8px]  font-medium"
        >
         <MessagesSquare className="mx-auto"></MessagesSquare>
        </button>
      </div>
    </div>
  );
};

export default NewCard;
