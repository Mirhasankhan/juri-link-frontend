"use client";

import Banner from "@/components/home/Banner";
import Faq from "@/components/home/Faq";
import FeaturedLawyers from "@/components/home/FeaturedLawyers";
import ForLawyer from "@/components/home/ForLawyer";
import Research from "@/components/home/Research";
import Testimonials from "@/components/home/Testi";

const HOmePage = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedLawyers></FeaturedLawyers>
      <ForLawyer></ForLawyer>
      <Research></Research>
      <Testimonials></Testimonials>
    </div>
  );
};

export default HOmePage;
