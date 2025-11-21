"use client";

import { useServicesQuery } from "@/redux/features/services/services.api";

type FiltersProps = {
  selectedService: string | null;
  setSelectedService: (val: string | null) => void;
  selectedLegalService: string | null;
  setSelectedLegalService: (val: string | null) => void;
  selectedUrgency: string | null;
  setSelectedUrgency: (val: string | null) => void;
};

const PostFilters = ({
  selectedService,
  setSelectedService,
  selectedLegalService,
  setSelectedLegalService,
  selectedUrgency,
  setSelectedUrgency,
}: FiltersProps) => {
  const { data: legalServices } = useServicesQuery("");

  const serviceOptions = [
    { label: "Online", value: "Online" },
    { label: "In Person", value: "In_Person" },
  ];

  const urgencyOptions = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
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
              className="accent-black w-5 h-5"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="p-4 max-w-md bg-white rounded-md shadow">
        <h1 className="text-2xl font-medium pb-4">Filters</h1>
      {renderCheckboxGroup("Service Type", serviceOptions, selectedService, setSelectedService)}

      {renderCheckboxGroup("Urgency", urgencyOptions, selectedUrgency, setSelectedUrgency)}

      {renderCheckboxGroup("Legal Services", legalServiceOptions, selectedLegalService, setSelectedLegalService)}
    </div>
  );
};

export default PostFilters;
