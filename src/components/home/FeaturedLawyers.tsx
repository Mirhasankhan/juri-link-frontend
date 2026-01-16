"use client";

import { useAllLawyersQuery } from "@/redux/features/auth/authApi";
import Container from "@/utils/Container";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { SkeletonCard } from "../shared/Skeleton";

const FeaturedLawyers = () => {
  const { data: lawyers, isLoading } = useAllLawyersQuery({
    experience: "",
    type: "",
    specializationId: "",
  });

  return (
    <Container>
      <h1 className="text-3xl font-bold text-center mt-24">Our Featured Lawyers</h1>
      <p className="text-center py-6 text-gray-500">
        Where Expertise Meets Efficiency – Delivering smart solutions tailored for your success.
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 auto-rows-fr">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={idx} height={350} />)
          : lawyers?.data?.slice(0,4).map((lawyer: any) => (
              <div
                key={lawyer._id}
                className="flex flex-col overflow-hidden rounded-[20px] border hover:border-yellow-700 hover:shadow-md"
              >
                <Image
                  src={lawyer?.profileImage || "/placeholder.png"}
                  width={400}
                  height={400}
                  alt={lawyer.fullName || "lawyer"}
                  className="h-[270px] w-full object-cover"
                />

                <div className="p-4 flex flex-col flex-1 bg-secondary/10">
                  <h1 className="text-xl font-medium">{lawyer.fullName}</h1>

                  {/* <div className="flex gap-1 flex-wrap mt-2">
                    {lawyer?.legalServices?.map(
                      (service: { _id: string; serviceName: string }) => (
                        <div
                          key={service._id}
                          className="rounded-[4px] text-secondary text-xs font-medium px-1 py-0.5 border border-gray-300"
                        >
                          {service.serviceName}
                        </div>
                      )
                    )}
                  </div> */}

                  <div className="flex pt-3 font-medium justify-between items-center">
                    <h1 className="text-gray-500">Experience</h1>
                    <p>{lawyer?.experience}+ years</p>
                  </div>

                  <div className="flex py-3 font-medium justify-between items-center">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <h1>{lawyer?.avgRating}</h1>
                    </div>
                    <p>({lawyer?.totalReview || 0})</p>
                  </div>

                  <h1 className="border-t border-gray-300 py-2 text-gray-600 mb-4">
                    {lawyer?.serviceType === "Both"
                      ? "Online & In Person"
                      : lawyer?.serviceType === "In_Person"
                      ? "In Person"
                      : lawyer?.serviceType}
                  </h1>

                  <Link href={`/lawyers/${lawyer._id}`} className="mt-auto w-full">
                    <button className="bg-secondary w-full py-2 rounded-[4px] text-white font-medium">
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </Container>
  );
};

export default FeaturedLawyers;
