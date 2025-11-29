"use client";
import Container from "@/utils/Container";
import { Mail, MapPin, MessageCircleMore } from "lucide-react";
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

  console.log(lawyer);

  return (
    <Container>
      <div className="grid grid-cols-3 shadow-lg text-black bg-white px-8 py-16 gap-6 rounded-[20px]">
        <div className="col-span-1 flex items-center justify-start">
          <Image
            alt=""
            height={200}
            width={700}
            className="object-cover w-[280px] h-[240px] rounded-xl"
            src={
              lawyer?.profileImage ||
              "https://nyc3.digitaloceanspaces.com/smtech-space/uploads/messages/files/1763556920491-62my97cxpb4.png"
            }
          ></Image>
        </div>
        <div className="col-span-2 flex flex-col">
          <div className="flex justify-between border-b pb-4 items-center">
            <div>
              <h1 className="text-4xl font-semibold">{lawyer?.fullName}</h1>
              <div className="flex gap-4 mt-4">
                {lawyer?.specialization?.map((s: any) => (
                  <h1
                    key={s._id}
                    className="px-2 py-1 text-sm  bg-secondary/10 rounded-[4px] text-secondary  font-medium"
                  >
                    {s.serviceName}
                  </h1>
                ))}
              </div>
            </div>
            <div>
              <MessageCircleMore
                onClick={() => handleMessage()}
                size={30}
                className="text-secondary cursor-pointer"
              />
            </div>
          </div>
          <div className="flex justify-between border-b py-4 items-center">
            <div>
              <h1 className="text-secondary font-medium text-xl">
                {lawyer?.avgRating}
              </h1>
              <p className="text-gray-500 text-sm">
                {lawyer?.totalReview} reviews
              </p>
            </div>
            <div>
              <h1 className="text-secondary font-medium text-xl">
                ${lawyer?.fee}
              </h1>
              <p className="text-gray-500 text-sm">per consultation</p>
            </div>
            <div>
              <h1 className="text-secondary font-medium text-xl">
                {lawyer?.serviceType === "Both"
                  ? "Online & In Person"
                  : lawyer?.serviceType === "In_Person"
                  ? "In Person"
                  : lawyer?.serviceType === "Online"
                  ? "Online"
                  : ""}
              </h1>
              <p className="text-gray-500 text-sm">consultation type</p>
            </div>
          </div>
          <div className="flex pt-4 justify-between">
            <div className="flex gap-1 items-center">
              <MapPin className="text-secondary"></MapPin>
              <h1 className="font-medium">{lawyer?.location}</h1>
            </div>
            <div className="flex gap-1 items-center">
              <Mail className="text-secondary"></Mail>
              <h1 className="font-medium">{lawyer?.email}</h1>
            </div>
            <button
              className="bg-purple-500 text-white px-4 py-2 font-medium rounded-[5px]"
              onClick={() => handleBook()}
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LawyerOverview;
