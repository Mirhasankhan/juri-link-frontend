"use client";

import { useAllLawyersQuery } from "@/redux/features/auth/authApi";
import Container from "@/utils/Container";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { SkeletonCard } from "../shared/Skeleton";

const FeaturedLawyers = () => {
  const {
    data: lawyers,
    isLoading,
    isFetching,
  } = useAllLawyersQuery({
    experience: "",
    type: "",
    specializationId: "",
  });
  console.log(lawyers?.data);
  return (
    <Container>
      <h1 className="text-4xl font-medium pt-8 pb-3">Our Featured Lawyers</h1>
      <div className="grid grid-cols-4 gap-8">
        {lawyers?.data?.map((lawyer: any) =>
          isFetching || isLoading ? (
            <SkeletonCard key={lawyer?._id} />
          ) : (
            <div
              key={lawyer?._id}
              className="overflow-hidden rounded-[20px] hover:border-yellow-700 border hover:shadow-md"
            >
              <Image
                src={lawyer?.profileImage}
                width={400}
                height={400}
                alt="lawyer"
                className="h-[300px] w-full object-cover"
              />

              <div className="p-4 bg-secondary/10">
                <h1 className="text-xl font-medium">{lawyer.fullName}</h1>

                <div className="flex gap-1">
                  {lawyer?.legalServices?.map(
                    (service: { _id: string; serviceName: string }) => (
                      <div
                        key={service._id}
                        className="rounded-[4px] text-secondary text-xs font-medium"
                      >
                        {service.serviceName}
                      </div>
                    )
                  )}
                </div>

                <div className="flex pt-3 font-medium justify-between items-center">
                  <h1 className="text-gray-500">Experience</h1>
                  <p>{lawyer?.experience}+ years</p>
                </div>

                <div className="flex py-3 font-medium justify-between items-center">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-red-500" />
                    <h1>{lawyer?.avgRating}</h1>
                  </div>
                  <p>({lawyer?.totalReview || 0})</p>
                </div>

                <h1 className="border-t py-3 text-gray-600">
                  {lawyer?.serviceType === "Both"
                    ? "Online & In Person"
                    : lawyer?.serviceType === "In_Person"
                    ? "In Person"
                    : lawyer?.serviceType}
                </h1>

                <Link className="w-full" href={`/lawyers/${lawyer._id}`}>
                  <button className="bg-secondary w-full py-2 rounded-[4px] text-white font-medium">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          )
        )}
      </div>
    </Container>
  );
};

export default FeaturedLawyers;
