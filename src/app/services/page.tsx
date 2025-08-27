"use client";

import { useServicesQuery } from "@/redux/features/services/services.api";

const ServicePage = () => {
  const { data: legalServies } = useServicesQuery("");
  console.log(legalServies?.data);
  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-medium text-primary">
          Our Practice Areas
        </h1>
        <p>Expert legal representation across multiple practice areas</p>
        <div>
          {legalServies?.data?.length > 0 ? (
            <div>
              {legalServies?.data?.map((service) => (
                <p key={service._id}>hello</p>
              ))}
            </div>
          ) : (
            "no services"
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
