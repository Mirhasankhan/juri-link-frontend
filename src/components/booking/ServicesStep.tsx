"use client";
import React, { useState } from "react";
import { Clock, DollarSign } from "lucide-react";
import { useServicesQuery } from "@/redux/features/services/services.api";

interface ServicesStepProps {
  category: string;
  onNext: () => void;
  onSelect: (service: string, price: number) => void;
}

const ServicesStep: React.FC<ServicesStepProps> = ({
  category,
  onNext,
  onSelect,
}) => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const { data: totalServices } = useServicesQuery(category);
  console.log(selectedPrice);

  const handleServiceSelect = (serviceId: string, price: number) => {
    setSelectedService(serviceId);
    setSelectedPrice(price);
    onSelect(serviceId, price);
  };

  const handleNext = () => {
    if (selectedService) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Select a Service
        </h2>
        <p className="text-gray-600">
          Choose from <span className="font-medium">{totalServices?.result?.categoryName}</span>{" "}
          services
        </p>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {totalServices?.result?.servicesWithAvgRating.map(
          (service: {
            id: string;
            serviceName: string;
            price: number;
            description: string;
          }) => {
            const isSelected = selectedService === service.id;

            return (
              <div
                key={service.id}
                onClick={() => handleServiceSelect(service.id, service.price)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 shadow-lg"
                    : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {service.serviceName}
                      </h3>
                      {isSelected && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock size={16} className="mr-1" />
                        45 min
                      </div>
                      <div className="flex items-center text-green-600 font-semibold">
                        <DollarSign size={16} className="mr-1" />
                        {service.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>

      <div className="flex justify-end pt-6">
        <button
          onClick={handleNext}
          disabled={!selectedService}
          className="px-6 rounded-xl items-center bg-primary text-xl text-white  py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default ServicesStep;
