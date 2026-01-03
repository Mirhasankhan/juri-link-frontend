"use client";

import Filters from "@/components/lawyers/Filters";
import Container from "@/utils/Container";
import { Funnel, Search, X } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAllLawyersQuery } from "@/redux/features/auth/authApi";
import LawyerCard from "@/components/lawyers/LawyerCard";
import { useSearchParams } from "next/navigation";
import { SkeletonCard } from "@/components/shared/Skeleton";

const LawyersPage = () => {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const serviceType = searchParams.get("serviceType");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>("");
  const [selectedService, setSelectedService] = useState<string | null>(
    serviceType || ""
  );
  const [selectedLegal, setSelectedLegal] = useState<string | null>(
    serviceId || ""
  );

  const { data: lawyers, isLoading } = useAllLawyersQuery({
    experience: selectedYear,
    type: selectedService,
    specializationId: selectedLegal,
  });

  const toggleFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };
  console.log(lawyers);

  return (
    <div className="bg-[#f8f8f8]">
      {showMobileFilters && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-3/4 h-full bg-white z-50 shadow-lg p-4 md:hidden"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={toggleFilters}>
              <X size={24} />
            </button>
          </div>
          <Filters
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            selectedLegalService={selectedLegal}
            setSelectedLegalService={setSelectedLegal}
          />
        </motion.div>
      )}

      <Container>
        <div className="grid grid-cols-4 gap-5 py-6">
          <div className="hidden md:block md:col-span-1">
            <Filters
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              selectedLegalService={selectedLegal}
              setSelectedLegalService={setSelectedLegal}
            />
          </div>
          <div className="col-span-4 md:col-span-3">
          
            {lawyers?.data?.length > 0 ? (
              <div>
                <div className="flex justify-between items-center pb-6">
                  <h1 className="md:text-xl font-medium">
                    Discover the Lawyer: ({lawyers?.data?.length}) Lawyer
                    Available for You to Explore
                  </h1>
                  <button
                    onClick={toggleFilters}
                    className="md:hidden font-medium border px-4 py-1 rounded-[6px] flex gap-2 items-center"
                  >
                    <Funnel size={18} />
                    Filters
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {lawyers?.data.map((lawyer: any) => (
                    <LawyerCard key={lawyer.id} lawyer={lawyer} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {isLoading ? (
                  <div className="grid grid-col-1 md:grid-cols-2 gap-6">
                    {Array.from({ length: 2 }).map((_, idx) => (
                      <SkeletonCard height={220} key={idx} />
                    ))}
                  </div>
                ) : (
                  <div className=" flex flex-col mt-16 items-center">
                    <div className="bg-primary/10 text-primary p-6 rounded-full">
                      <Search size={40}></Search>
                    </div>
                    <h1 className="text-2xl font-medium py-2">
                      Now Lawyers Found
                    </h1>
                    <p className="text-gray-600 ">
                      We couldn&apos;t find any lawyers matching your search,
                      Try adjusting your criteria.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LawyersPage;
