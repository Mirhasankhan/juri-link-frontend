"use client";

import { useServiceQuery } from "@/redux/features/services/services.api";
import Container from "@/utils/Container";
import { Lightbulb } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const ServiceDetailsPage = () => {
  const { serviceId } = useParams();
  const router = useRouter();
  const { data: service, isLoading } = useServiceQuery(serviceId);
  if (isLoading) {
    return "laoding";
  }
  const { description, dyk, serviceName, serviceMedia, importance, _id } =
    service?.data?.service;

  const handleNavigate = (id: string) => {
    router.push(`/lawyers?serviceId=${id}`);
  };

  return (
    <div className="bg-[#f8f8f8] py-8">
      <Container>
        <div className="grid grid-cols-2 mb-8  gap-6">
          <div className="p-8 flex flex-col bg-white rounded-[6px] border">
            <h1 className="text-xl font-medium pb-3">
              Why hire a {serviceName} lawyer?
            </h1>
            <p>{importance}</p>
            <button
              className="bg-secondary/10 mt-auto text-secondary px-4 py-2 font-medium rounded-[6px]"
              onClick={() => handleNavigate(_id)}
            >
              View {serviceName} Lawyers
            </button>
          </div>
          <div>
            <Image
              className="rounded-[6px] w-full h-full object-cover"
              src={serviceMedia}
              alt=""
              height={200}
              width={300}
            ></Image>
          </div>
        </div>
        <h1 className="text-xl font-medium pb-3">
          What an {serviceName} lawyer can do for you?
        </h1>
        <p>{description}</p>
        <div className="flex rounded-[8px] p-6  mb-6 items-center text-white mt-8 justify-between bg-gradient-to-r from-primary/60 to-secondary/70">
          <div>
            <h1 className="text-2xl pb-3 font-medium">Do You Know?</h1>
            <p>{dyk}</p>
          </div>
          <div className="bg-secondary/50 p-2 rounded-full border-2 border-white">
            <Lightbulb size={70}></Lightbulb>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ServiceDetailsPage;
