"use client";
import Link from "next/link";
import bgImage from "../../assets/about-us.webp";
import arrow from "../../assets/arrow.png";
import Image from "next/image";
import { useExpertsQuery } from "@/redux/features/career/career.api";
import Expert from "@/components/shared/Expert";
import Benefits from "@/components/home/Benefits";
import BestServices from "@/components/home/BestServices";
import Container from "@/utils/Container";

const AboutUsPage = () => {
  const { data: allExperts } = useExpertsQuery("");
  return (
    <div>
      <div
        className="h-[250px] md:h-[450px] 2xl:h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage.src})` }}
      >
        <div className="bg-black h-full w-full flex flex-col items-center justify-center bg-opacity-70">
          <div className="flex gap-2 mt-2 font-medium">
            <Link className="text-white" href="/">
              Home /
            </Link>
            <h1 className="text-white">About</h1>
          </div>
          <h1 className="text-white text-5xl font-semibold">About Us</h1>
        </div>
      </div>
      <BestServices></BestServices>
      <Benefits></Benefits>
      <div>
        <h1 className="text-center text-xl md:text-4xl font-medium pt-8">
          Our Experts
        </h1>
        <Image
          className="mx-auto py-6"
          src={arrow}
          height={24}
          width={200}
          alt="sdfs"
        ></Image>
        <Container>     
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8 pb-8">
            <Expert experts={allExperts?.result}></Expert>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AboutUsPage;
