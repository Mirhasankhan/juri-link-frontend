"use client";

import { useAllLawyersQuery } from "@/redux/features/auth/authApi";
import Container from "@/utils/Container";
import { SkeletonCard } from "../shared/Skeleton";
import NewCard from "../lawyers/NewCard";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

const FeaturedLawyers = () => {
  const { data: lawyers, isLoading } = useAllLawyersQuery({
    experience: "",
    type: "",
    specializationId: "",
  });

  return (
   <div className="bg-primary/5 py-16">
     <Container>
      <div>
        <h1 className="text-4xl font-semibold">
          Meet Our Featured <br /> Lawyers
        </h1>
        <div className="flex py-6 justify-between items-center">
          <p className=" text-gray-600">
            Consult with the most sought-after legal minds in the industry,
            ranked by client <br /> success and peer recognition.
          </p>
         <Link href="/lawyers"> <button className="flex gap-2 items-center text-primary">See All Lawyers <ArrowRightIcon size={20}/></button></Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 auto-rows-fr">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonCard key={idx} height={350} />
            ))
          : lawyers?.data
              ?.slice(0, 4)
              .map((lawyer: any) => (
                <NewCard key={lawyer.id} lawyer={lawyer}></NewCard>
              ))}
      </div>
    </Container>
   </div>
  );
};

export default FeaturedLawyers;
