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
  console.log(lawyer);
  return (
    <div className="bg-[#f8f8f8] py-12">
      <Container>
        <div className="grid grid-cols-2 md:mx-16 text-black gap-6 ">
          <Image
            alt=""
            height={200}
            width={700}
            className="border-2 object-cover h-[420px] w-full rounded-xl"
            src={
              lawyer?.profileImage ||
              "https://images.unsplash.com/photo-1642911353098-42efaae7f6d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxhd3llcnxlbnwwfHwwfHx8MA%3D%3D"
            }
          ></Image>
          <div>
            <h1 className="text-4xl font-semibold">{lawyer?.fullName}</h1>
            <div className="flex gap-4">
              {lawyer?.specialization?.map((s: any) => (
                <h1 key={s._id} className="text-xl font-semibold pt-2">
                  {s.serviceName}
                </h1>
              ))}
            </div>

            <div className="flex items-center mt-4 gap-2">
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white bg-opacity-15">
                <Clock className="text-primary" size={20}></Clock>
                <p>{lawyer?.experience} years of experience</p>
              </div>
              <div className="flex gap-1 items-center">
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
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleBook}
                className="bg-black w-full py-2 rounded-[4px] text-white font-medium"
              >
                Book Consultation
              </button>

              <button className="text-red-600 border-red-600 border  w-full py-2 rounded-[4px]  font-medium">
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
