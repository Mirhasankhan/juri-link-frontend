"use client";

import { useServicesQuery } from "@/redux/features/services/services.api";
import Container from "@/utils/Container";
import Image from "next/image";

const ServicePage = () => {
  const { data: legalServies } = useServicesQuery("");

  return (
    <Container>
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-semibold text-primary tracking-wide">
          Our Practice Areas
        </h1>
        <p className="text-gray-600">
          Expert legal representation across multiple practice areas
        </p>
      </div>

      <div className="my-12">
        {legalServies?.data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {legalServies?.data?.map((service: any) => (
              <div
                key={service._id}
                className="flex flex-col border rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
              >            
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary p-1 rounded-full shadow-md">
                    <Image
                      className="rounded-full h-12 w-12 object-cover"
                      alt={service.serviceName}
                      height={48}
                      width={48}
                      src={service.serviceIcon}
                    />
                  </div>
                  <h2 className="text-xl font-semibold mt-4 text-gray-800">
                    {service.serviceName}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    {service.overview}
                  </p>
                </div>     
                <div className="mt-6 space-y-2 flex-1">
                  <h3 className="text-base font-semibold text-gray-700 text-left">
                    Key Features
                  </h3>
                  <div className="space-y-2">
                    {service.features?.map((feature: string, i: number) => (
                      <div className="flex gap-2 items-start" key={i}>
                        <span className="h-[8px] w-[8px] rounded-full bg-yellow-400 mt-2"></span>
                        <p className="text-sm text-gray-600">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>           
                <div className="mt-6">
                  <button className="bg-primary w-full text-white font-medium py-2.5 rounded-[6px] hover:bg-primary/90 transition">
                    Find {service.serviceName} Lawyers
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-8">No services found.</p>
        )}
      </div>
    </Container>
  );
};

export default ServicePage;
