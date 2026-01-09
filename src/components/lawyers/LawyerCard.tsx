import { JWTDecode } from "@/utils/jwt";
import { AlarmClockPlus, MapPin, Star, User, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const LawyerCard = ({ lawyer }: { lawyer: any }) => {
  const { decoded } = JWTDecode();
  const router = useRouter();

  const handleMessage = () => {
    if (!decoded?.email) return router.push(`/auth/login`);
    router.push(`/messages?receiverId=${lawyer._id}`);
  };
  return (
    <div className="p-3 bg-white rounded-[8px] w-full border max-h-[230px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Image
            className="h-[60px] w-[60px] object-cover rounded-full"
            height={400}
            width={100}
            src={
              lawyer?.profileImage ||
              "https://sefr.lon1.digitaloceanspaces.com/sefr/uploads/messages/files/1766554616119-kvs0lfqo4u.png"
            }
            alt=""
          ></Image>
          <div>
            <h1 className="font-medium text-xl pb-1">{lawyer?.fullName}</h1>

            <div className="flex gap-1">
              {lawyer?.legalServices?.map(
                (service: { _id: string; serviceName: string }) => (
                  <div
                    key={service._id}
                    className="px-2 py-0.5  bg-primary/10 rounded-[4px] text-primary text-xs font-medium"
                  >
                    {service.serviceName}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-primary text-xl font-medium">${lawyer?.fee}</h1>
          <div className="gap-1 items-center flex">
            <Star size={18} className="text-orange-400"></Star>
            <p>{lawyer?.avgRating}</p>
          </div>
        </div>
      </div>
      <div className="flex my-3 justify-between items-center">
        <div className="flex gap-1 items-center">
          <MapPin size={20} className="text-primary"></MapPin>
          <h1>{lawyer?.location}</h1>
        </div>
        <div className="flex gap-1 items-center">
          <AlarmClockPlus size={20} className="text-primary"></AlarmClockPlus>
          <h1>Experience: {lawyer?.experience} Years</h1>
        </div>
      </div>
      <div className="flex mt-2 justify-between items-center">
        <div className="flex gap-1 items-center">
          {(lawyer.serviceType === "Online" ||
            lawyer.serviceType === "Both") && (
            <Video size={20} className="text-primary" />
          )}
          {(lawyer.serviceType === "In_Person" ||
            lawyer.serviceType === "Both") && (
            <User size={20} className="text-primary"></User>
          )}

          <h1>
            {lawyer?.serviceType == "Both"
              ? "Online & In Person"
              : lawyer.serviceType == "Online"
              ? "Online"
              : "In Person"}
          </h1>
        </div>

        <h1 className="text-sm border-2 font-medium py-1 px-2 rounded-[4px]">
          10 (Booked)
        </h1>
      </div>
      <div className="flex gap-6 mt-4">
        <Link className="w-full" href={`/lawyers/${lawyer._id}`}>
          <button className="bg-primary w-full py-1 rounded-[4px] text-white font-medium">
            View Profile
          </button>
        </Link>
        <button
          onClick={handleMessage}
          className="text-primary border-primary border  w-full py-1 rounded-[4px]  font-medium"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default LawyerCard;
