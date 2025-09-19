import { AlarmClockPlus, MapPin, Star, User, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LawyerCard = ({ lawyer }: { lawyer: any }) => {
  console.log(lawyer);
  return (
    <div className="p-3 rounded-[8px] w-full shadow-2xl max-h-[220px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Image
            className="h-[40px] w-[40px] object-cover rounded-full"
            height={400}
            width={100}
            src={
              "https://images.unsplash.com/photo-1743328008236-894ce463461e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
            }
            alt=""
          ></Image>
          <div>
            <h1 className="font-medium text-xl">{lawyer?.fullName}</h1>

            <div className="flex gap-1">
              {lawyer?.legalServices?.map(
                (service: { _id: string; serviceName: string }) => (
                  <div key={service._id}>
                    <p className="text-primary text-xs font-medium">
                      {service?.serviceName} |
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-primary text-xl font-medium">${lawyer?.fee}</h1>
          <div className="gap-1 items-center flex">
            <Star size={18} className="text-orange-400"></Star>{" "}
            <p>{lawyer?.avgRating}</p>
          </div>
        </div>
      </div>
      <div className="flex mt-2 justify-between items-center">
        <div className="flex gap-1 items-center">
          <MapPin size={15} className="text-primary"></MapPin>
          <h1 className="text-sm">New York City</h1>
        </div>
        <div className="flex gap-1 items-center">
          <AlarmClockPlus size={15} className="text-primary"></AlarmClockPlus>
          <h1 className="text-sm">Experience: {lawyer?.experience} Years</h1>
        </div>
      </div>
      <div className="flex mt-2 justify-between items-center">
        <div className="flex gap-1 items-center">
          {(lawyer.serviceType === "Online" ||
            lawyer.serviceType === "Both") && (
            <Video size={15} className="text-primary" />
          )}
          {(lawyer.serviceType === "In_Person" ||
            lawyer.serviceType === "Both") && (
            <User size={15} className="text-primary"></User>
          )}

          <h1 className="text-sm">
            {lawyer?.serviceType == "Both"
              ? "Online & In Person"
              : lawyer.serviceType == "Online"
              ? "Online"
              : "In Person"}
          </h1>
        </div>

        <h1 className="text-sm border-2 font-medium py-1 px-2 rounded-xl">
          New York State Bar
        </h1>
      </div>
      <div className="flex gap-6 mt-4">
        <Link className="w-full" href={`/lawyers/${lawyer._id}`}>
          <button className="bg-primary w-full py-1 rounded-[4px] text-white font-medium">
            View Details
          </button>
        </Link>
        <button className="text-primary border-primary border  w-full py-1 rounded-[4px]  font-medium">
          Send Message
        </button>
      </div>
    </div>
  );
};

export default LawyerCard;
