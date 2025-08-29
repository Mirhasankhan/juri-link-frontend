"use client";

import { useServicesQuery } from "@/redux/features/services/services.api";
import Container from "@/utils/Container";
import Image from "next/image";

const ServicePage = () => {
  const { data: legalServies } = useServicesQuery("");

  return (
    <Container>
      <div className="text-center">
        <h1 className="text-2xl font-medium text-primary">
          Our Practice Areas
        </h1>
        <p>Expert legal representation across multiple practice areas</p>
        <div>
          {legalServies?.data?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">
              {legalServies?.data?.map((service: any) => (
                <div className="border p-6" key={service._id}>
                  <div className="flex flex-col pb-6 justify-center items-center">
                    <div className="bg-primary p-2 rounded-xl">
                      <Image
                        className="h-12 w-12 rounded-[12px]"
                        alt=""
                        height={40}
                        width={40}
                        src={service.serviceIcon}
                      ></Image>
                    </div>
                    <h1 className="text-xl font-medium py-2">{service.serviceName}</h1>
                    <h1>
                      {service.overview}sdf sdklflsdkjfl skjdflk
                      sdjflksdjofisdjsdlk jslk;dfjl;k sjflks sdjflksdjflksd
                    </h1>
                  </div>
                  <div>
                    <h1 className="text-start">Key Features</h1>
                    {service.features?.map((feature: string) => (
                      <div className="flex gap-2 items-center" key={feature}>
                        <h1 className="h-[8px] w-[8px] rounded-full bg-yellow-400"></h1>
                        <h1 className="font-medium">{feature}</h1>
                      </div>
                    ))}
                    <button className="bg-primary w-full text-white font-medium mt-auto py-2 rounded-[6px]">Find{service.serviceName} Lawyers</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            "no services"
          )}
        </div>
      </div>
    </Container>
  );
};

export default ServicePage;
