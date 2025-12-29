"use client";

import { useServicesQuery } from "@/redux/features/services/services.api";

type FiltersProps = {
  selectedYear: string | null;
  setSelectedYear: (val: string | null) => void;
  selectedService: string | null;
  setSelectedService: (val: string | null) => void;
  selectedLegalService: string | null;
  setSelectedLegalService: (val: string | null) => void;
};

const Filters = ({
  selectedYear,
  setSelectedYear,
  selectedService,
  setSelectedService,
  selectedLegalService,
  setSelectedLegalService,
}: FiltersProps) => {
  const { data: legalServices } = useServicesQuery(""); 

  const yearOptions = [
    { label: "1 Year", value: "1" },
    { label: "2 Years", value: "2" },
    { label: "3 Years", value: "3" },
    { label: "4 Years", value: "4" },
    { label: "5 Years", value: "5" },
  ];

  const serviceOptions = [
    { label: "Online Consultation", value: "Online" },
    { label: "In Person Meeting", value: "In_Person" },
    { label: "Online & In Person", value: "Both" },
  ];

  const legalServiceOptions =
    legalServices?.data?.map((service: any) => ({
      label: service.serviceName,
      value: service._id,
    })) || [];

  const renderCheckboxGroup = (
    title: string,
    options: { label: string; value: string }[],
    selected: string | null,
    setSelected: (val: string | null) => void
  ) => (
    <div className="pb-4 mb-4 border-b border-gray-300">
      <h3 className="font-semibold mb-2">{title}</h3>
      {options.map((option, index) => (
        <label
          key={index}
          className="flex items-center space-x-2 cursor-pointer mb-1"
        >
          <input
            type="checkbox"
            checked={selected === option.value}
            onChange={() =>
              setSelected(selected === option.value ? null : option.value)
            }
            className="accent-orange-600 w-4 h-4"
          />
          <span className="text-gray-600">{option.label}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="p-4 max-w-md bg-white rounded-[6px] shadow">
      {renderCheckboxGroup("Years of Experience", yearOptions, selectedYear, setSelectedYear)}
      {renderCheckboxGroup("Service Type", serviceOptions, selectedService, setSelectedService)}
      {renderCheckboxGroup("Legal Services", legalServiceOptions, selectedLegalService, setSelectedLegalService)}
    </div>
  );
};

export default Filters;
