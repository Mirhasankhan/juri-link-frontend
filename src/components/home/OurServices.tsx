import React from "react";
import ServiceCard from "../shared/ServiceCard";
import Container from "@/utils/Container";

const OurServices = () => {
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-5xl text-center pb-2 font-medium text-primary">
          Our Legal Services
        </h1>
        <p className="text-center text-xl text-gray-500">
          We provide comprehensive legal representation across multiple practice
          areas,
          <br /> ensuring you receive expert guidance no matter your legal
          needs.
        </p>
        <div className="pt-8 grid grid-cols-3 gap-6">
          <ServiceCard></ServiceCard>
          <ServiceCard></ServiceCard>
          <ServiceCard></ServiceCard>
        </div>
      </div>
    </Container>
  );
};

export default OurServices;
