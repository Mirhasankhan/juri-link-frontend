"use client";
import Container from "@/utils/Container";
import bgImage from "../../assets/service.jpg";
import Image from "next/image";
import { useServicesQuery } from "@/redux/features/services/services.api";
import Categories from "@/components/services/Categories";
import { useState } from "react";
import { TService } from "@/types/common";
import Card from "@/components/services/Card";
import Expert from "@/components/shared/Expert";
import { useExpertsQuery } from "@/redux/features/career/career.api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


const Services = () => {
  const params = useSearchParams();
  const category = params.get("category");
  const [active, setActive] = useState(category || "682b475155275c85dc32b417");
  const { data: allExperts } = useExpertsQuery(active);
  const { data: services, isLoading } = useServicesQuery(active);
console.log(category);

  return (
    <div>
      <div
        className="h-[200px] md:h-[200px] 2xl:h-[350px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage.src})` }}
      >
        <div className="bg-black h-full w-full flex flex-col items-center justify-center bg-opacity-70">
          <h1 className="text-white text-5xl font-semibold">
            {services?.result?.categoryName}
          </h1>
          <div className="flex gap-2 mt-2 font-medium">
            <Link className="text-white" href="/">
              Home /{" "}
            </Link>
            <h1 className="text-primary">{services?.result?.categoryName}</h1>
          </div>
        </div>
      </div>
      <Container>
        <div className="grid grid-cols-3 gap-8 my-8">
          <div className="col-span-3 md:col-span-1">
            <div className="sticky top-20">
              {isLoading ? (
                <div className="h-60 w-full bg-gray-300 border rounded-2xl animate-pulse"></div>
              ) : (
                <Categories active={active} setActive={setActive} />
              )}
            </div>
          </div>
          <div className="col-span-3 md:col-span-2">
            {isLoading ? (
              <div className="h-80 w-full bg-gray-300 border rounded-2xl animate-pulse"></div>
            ) : (
              <Image
                height={400}
                width={1500}
                src={services?.result?.mediaUrl}
                alt=""
                className="rounded-[4px]"
              ></Image>
            )}
            <h1 className="text-2xl uppercase font-semibold py-6">
              {services?.result?.categoryName}
            </h1>
            <p>
             {services?.result?.description}
            </p>
            <h1 className="text-2xl text-primary font-semibold py-4">Available Services</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-2 md:gap-6">
              {services?.result?.servicesWithAvgRating?.map(
                (service: TService) => (
                  <Card service={service} key={service.id}></Card>
                )
              )}
            </div>
            <h1 className="text-2xl pt-12 text-primary pb-4 font-medium">
              Our {services?.result?.categoryName} Specialists
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 pb-8">
              <Expert experts={allExperts?.result}></Expert>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Services;
