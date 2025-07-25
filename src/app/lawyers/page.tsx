import Filters from "@/components/lawyers/Filters";
import LawyerCard from "@/components/lawyers/LawyerCard";
import SearchLawyers from "@/components/lawyers/SearchLawyers";
import Container from "@/utils/Container";
import React from "react";

const LawyersPage = () => {
  return (
    <div>
      <SearchLawyers></SearchLawyers>
      <Container>
        <div className="grid grid-cols-4 gap-5 mt-6">
          <div className="col-span-1 bg-red-400">
            <Filters></Filters>
          </div>
          <div className="col-span-3 grid grid-cols-2 gap-3">
            <LawyerCard></LawyerCard>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LawyersPage;
