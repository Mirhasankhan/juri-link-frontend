import Banner from "@/components/career/Banner";
import JobOpenings from "@/components/career/JobOpenings";
import Container from "@/utils/Container";
import React from "react";

const CareerPage = () => {
  return (
    <div>
      <div className="bg-[#202c24]">
        <Container>
          <Banner></Banner>
        </Container>
      </div>
      <Container>
        <JobOpenings></JobOpenings>
      </Container>
    </div>
  );
};

export default CareerPage;
