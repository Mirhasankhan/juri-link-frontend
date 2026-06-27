"use client";

import Banner from "@/components/home/Banner";
import FeaturedLawyers from "@/components/home/FeaturedLawyers";
import ForInPerson from "@/components/home/ForInPerson";
import ForLawyer from "@/components/home/ForLawyer";
import OnlineConsultation from "@/components/home/OnlineConsultation";
import LegalIntakeHero from "@/components/home/PostNeed";
// import Research from "@/components/home/Research";
import OurServices from "@/components/home/Services";
import Testimonials from "@/components/home/Testi";

const HOmePage = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedLawyers></FeaturedLawyers>
      <ForLawyer></ForLawyer>
     
      <OnlineConsultation></OnlineConsultation>
       <OurServices></OurServices>
      {/* <ForOnline></ForOnline> */}
      <ForInPerson></ForInPerson>
<LegalIntakeHero></LegalIntakeHero>
      {/* <Research></Research> */}
      <Testimonials></Testimonials>
    </div>
  );
};

export default HOmePage;
