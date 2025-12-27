"use client";

import Banner from "@/components/home/Banner";
import FeaturedLawyers from "@/components/home/FeaturedLawyers";
import ForInPerson from "@/components/home/ForInPerson";
import ForLawyer from "@/components/home/ForLawyer";
import ForOnline from "@/components/home/ForOnline";
import Research from "@/components/home/Research";
import OurServices from "@/components/home/Services";
import Testimonials from "@/components/home/Testi";

const HOmePage = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedLawyers></FeaturedLawyers>
      <ForLawyer></ForLawyer>
      <OurServices></OurServices>
      <ForInPerson></ForInPerson>
      <ForOnline></ForOnline>
      <Research></Research>
      <Testimonials></Testimonials>
    </div>
  );
};

export default HOmePage;
