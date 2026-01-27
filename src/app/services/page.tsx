"use client";

import { SkeletonCard } from "@/components/shared/Skeleton";
import { useServicesQuery } from "@/redux/features/services/services.api";
import Container from "@/utils/Container";
import { Scale } from "lucide-react";
import Link from "next/link";

const ServicesPage = () => {
  const { data: legalServies } = useServicesQuery("");
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Container>
        {/* Header Section */}
        <div className="py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Areas of Legal Expertise
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our expert practice areas—from Family Law to Real Estate and
            beyond, tailored to protect your rights and interests.
          </p>
        </div>

        {/* Services Grid */}
        {legalServies?.data?.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-16">
            {legalServies?.data?.map((service: any) => (
              <Link
                href={`/services/${service._id}`}
                key={service._id}
                className="group"
              >
                <div className="h-full bg-white rounded-[12px] border border-gray-200 hover:border-secondary hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="mb-4 p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-[10px] text-primary group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                    <Scale size={32} />
                  </div>

                  {/* Service Name */}
                  <h3 className="font-semibold text-gray-900 text-lg group-hover:text-secondary transition-colors duration-300 line-clamp-2">
                    {service?.serviceName}
                  </h3>

                  {/* Arrow Indicator */}
                  <div className="mt-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-5 h-5 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-16">
            {Array.from({ length: 12 }).map((_, idx) => (
              <SkeletonCard height={160} key={idx} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default ServicesPage;
