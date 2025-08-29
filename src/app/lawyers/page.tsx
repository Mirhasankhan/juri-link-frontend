"use client";

import Filters from "@/components/lawyers/Filters";
// import LawyerCard from "@/components/lawyers/LawyerCard";
import SearchLawyers from "@/components/lawyers/SearchLawyers";
import Container from "@/utils/Container";
import { Funnel, X } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAllLawyersQuery } from "@/redux/features/auth/authApi";
import LawyerCard from "@/components/lawyers/LawyerCard";

const LawyersPage = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedBar, setSelectedBar] = useState<string | null>(null);

  const { data: lawyers } = useAllLawyersQuery("");
  console.log(lawyers?.data);

  const toggleFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div>
      <SearchLawyers />
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
          {/* pass filter state + setters */}
          <Filters
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            selectedBar={selectedBar}
            setSelectedBar={setSelectedBar}
          />
        </motion.div>
      )}

      <Container>
        <div className="grid grid-cols-4 gap-5 my-6">
          <div className="hidden md:block md:col-span-1">
            <Filters
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              selectedBar={selectedBar}
              setSelectedBar={setSelectedBar}
            />
          </div>
          <div className="col-span-4 md:col-span-3">
            {/* <div className="flex justify-between items-center pb-6">
              <h1 className="text-xl font-medium">
                Found &quot;{lawyers.length} lawyers&quot;
              </h1>
              <button
                onClick={toggleFilters}
                className="md:hidden font-medium border px-4 py-1 rounded-[6px] flex gap-2 items-center"
              >
                <Funnel size={18} />
                Filters
              </button>
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lawyers?.data.map((lawyer: any) => (
                <LawyerCard key={lawyer.id} {...lawyer} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LawyersPage;
