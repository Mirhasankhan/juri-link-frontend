"use client";
import Container from "@/utils/Container";
import { Clock, Star, User, Video } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LawyerOverview = ({ lawyer }: { lawyer: any }) => {
  const router = useRouter();

  const handleBook = () => {
    router.push(`/book?lawyerId=${lawyer._id}`);
  };
  const handleMessage = () => {
    router.push(`/messages?receiverId=${lawyer._id}`);
  };

  return (
    <div className="bg-[#f8f8f8] py-12">
      <Container>
        <div className="grid grid-cols-2  text-black gap-6 ">
          <Image
            alt=""
            height={200}
            width={700}
            className="border-2 object-cover h-[420px] w-full rounded-xl"
            src={
              lawyer?.profileImage ||
              "https://nyc3.digitaloceanspaces.com/smtech-space/uploads/messages/files/1763556920491-62my97cxpb4.png"
            }
          ></Image>
          <div className="flex flex-col">
            <h1 className="text-5xl font-semibold">{lawyer?.fullName}</h1>
            <div className="flex gap-4 mt-4">
              {lawyer?.specialization?.map((s: any) => (
                <h1
                  key={s._id}
                  className="px-4 py-2  bg-primary/10 rounded-[4px] text-primary  font-medium"
                >
                  {s.serviceName}
                </h1>
              ))}
            </div>

            <div className="flex items-center mt-4 gap-2">
              <div className="flex items-center gap-1 py-1 rounded-full bg-white bg-opacity-15">
                <Clock className="text-primary" size={20}></Clock>
                <p className="font-semibold text-gray-600">{lawyer?.experience} years of experience</p>
              </div>
            </div>
            <div className="flex mt-4 gap-1 items-center">
              {(lawyer?.serviceType === "Online" ||
                lawyer?.serviceType === "Both") && (
                <Video size={20} className="text-primary" />
              )}
              {(lawyer?.serviceType === "In_Person" ||
                lawyer?.serviceType === "Both") && (
                <User size={20} className="text-primary"></User>
              )}

              <h1 className="text-sm">
                {lawyer?.serviceType == "Both"
                  ? "Online & In Person"
                  : lawyer?.serviceType == "Online"
                  ? "Online"
                  : "In Person"}
              </h1>
            </div>
            <div className="flex items-center mt-4 gap-2">
              <div className="flex items-center gap-4 py-2 rounded-xl bg-white bg-opacity-15">
                <div className="flex gap-1">
                  <Star size={18} className="text-orange-500"></Star>
                  <Star size={18} className="text-orange-500"></Star>
                  <Star size={18} className="text-orange-500"></Star>
                  <Star size={18} className="text-orange-500"></Star>
                  <Star size={18} className="text-orange-500"></Star>
                </div>

                <h1 className="text-2xl font-semibold">{lawyer?.avgRating}</h1>
                <p>({lawyer?.totalReview} reviews)</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <h1 className="text-2xl font-semibold">$430</h1>
              <p>per Consultation</p>
            </div>
            <div className="flex  gap-4 mt-auto">
              <button
                onClick={handleBook}
                className="bg-[#1f2b44] w-full py-2 rounded-[4px] text-white font-medium"
              >
                Book Consultation
              </button>

              <button   onClick={handleMessage} className="text-primary border-primary border  w-full py-2 rounded-[4px]  font-medium">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LawyerOverview;
