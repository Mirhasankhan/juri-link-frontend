"use client";

import { JWTDecode } from "@/utils/jwt";
import { MessagesSquare, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa6";

const NewCard = ({ lawyer }: { lawyer: any }) => {
  const { decoded } = JWTDecode();
  const router = useRouter();
  console.log(lawyer);

  const handleMessage = () => {
    if (!decoded?.email) return router.push(`/auth/login`);
    router.push(`/messages?receiverId=${lawyer._id}`);
  };
  return (
    <div className="bg-white rounded-[16px] overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-200 h-[280px]">
        <Image
          src={lawyer?.profileImage || "/placeholder.png"}
          width={400}
          height={400}
          alt={lawyer.fullName || "lawyer"}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {/* Rating Badge */}
        {lawyer?.avgRating && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1 text-sm font-semibold text-gray-800">
            <FaStar className="text-yellow-400" />
            {lawyer.avgRating.toFixed(1)}
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-1">
        {/* Lawyer Name */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {lawyer?.fullName}
          </h2>
          <div className="flex justify-center text-sm items-center gap-1 bg-primary/10 text-primary font-medium py-1 px-3 rounded-full">
            <Timer size={15} /> {lawyer?.experience} yrs
          </div>
        </div>

        {/* Service Type */}
        <p className="text-sm text-gray-600 mb-3 font-medium">
          {lawyer?.serviceType == "Both"
            ? "🌐 Online & In Person"
            : lawyer.serviceType == "Online"
              ? "🌐 Online Consultation"
              : "🏢 In Person Consultation"}
        </p>

        {/* Legal Services */}
        {lawyer?.legalServices?.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 mb-2">
              SPECIALIZATIONS
            </p>
            <div className="flex flex-wrap gap-1.5">
              {lawyer?.legalServices
                ?.slice(0, 3)
                .map((service: { _id: string; serviceName: string }) => (
                  <span
                    key={service._id}
                    className="inline-block bg-secondary/10 text-secondary text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {service.serviceName}
                  </span>
                ))}
              {lawyer?.legalServices?.length > 3 && (
                <span className="inline-block text-gray-500 text-xs px-2.5 py-1">
                  +{lawyer?.legalServices?.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-2 mt-auto">
          <Link href={`/lawyers/${lawyer._id}`} className="col-span-3">
            <button className="w-full bg-primary hover:bg-primary/90 py-2.5 rounded-[10px] text-white font-semibold transition-colors duration-200">
              View Profile
            </button>
          </Link>
          <button
            onClick={handleMessage}
            className="col-span-1 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-[10px] transition-colors duration-200 flex items-center justify-center"
            title="Send Message"
          >
            <MessagesSquare size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
