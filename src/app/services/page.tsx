"use client";

import { useServicesQuery } from "@/redux/features/services/services.api";
import Container from "@/utils/Container";
import { Scale } from "lucide-react";
import Link from "next/link";

const ServicesPage = () => {
  const { data: legalServies } = useServicesQuery("");
  console.log(legalServies?.data);
  return (
    <div className="bg-[#f8f8f8]">
      <Container>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 py-12">
          {legalServies?.data?.map((service: any) => (
            <Link
              href={`/services/${service._id}`}
              className="flex items-center bg-white hover:border-secondary hover:shadow-md gap-2 border p-4 rounded-[6px]"
              key={service._id}
            >
              <div className="p-2 bg-secondary/10 rounded-[5px] text-secondary">
                <Scale></Scale>
              </div>
              <p className="font-medium">{service?.serviceName}</p>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ServicesPage;
