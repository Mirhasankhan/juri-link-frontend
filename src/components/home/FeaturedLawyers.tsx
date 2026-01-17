"use client";

import { useAllLawyersQuery } from "@/redux/features/auth/authApi";
import Container from "@/utils/Container";
import { SkeletonCard } from "../shared/Skeleton";
import NewCard from "../lawyers/NewCard";

const FeaturedLawyers = () => {
  const { data: lawyers, isLoading } = useAllLawyersQuery({
    experience: "",
    type: "",
    specializationId: "",
  });

  return (
    <Container>
      <h1 className="text-3xl font-bold text-center mt-24">
        Our Featured Lawyers
      </h1>
      <p className="text-center py-6 text-gray-500">
        Where Expertise Meets Efficiency – Delivering smart solutions tailored
        for your success.
      </p>

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
  );
};

export default FeaturedLawyers;
