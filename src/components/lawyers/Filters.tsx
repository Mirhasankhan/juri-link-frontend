"use client"
import { useState } from "react";


const Filters = () => {
  const yearOptions = ["1 year", "2 years", "3 years", "4 years", "5 years"];
  const serviceOptions = ["Online Consultation", "In Call Meeting"];
  const barOptions = [
    "New York State Bar",
    "California State Bar",
    "Texas State Bar",
    "Florida Bar",
    "Illinois State Bar",
    "Washington State Bar",
  ];

  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedBar, setSelectedBar] = useState<string | null>(null);

  const renderCheckboxGroup = (
    title: string,
    options: string[],
    selected: string | null,
    setSelected: (val: string | null) => void
  ) => (
    <div className="pb-4 mb-4 border-b border-gray-300">
      <h3 className="font-semibold mb-2">{title}</h3>
      {options.map((option, index) => (
        <label key={index} className="flex items-center space-x-2 cursor-pointer mb-1">
          <input
            type="checkbox"
            checked={selected === option}
            onChange={() => setSelected(selected === option ? null : option)}
            className="accent-blue-500 w-4 h-4"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="p-4 max-w-md bg-white rounded-md shadow">
      {renderCheckboxGroup("Years of Experience", yearOptions, selectedYear, setSelectedYear)}
      {renderCheckboxGroup("Service Type", serviceOptions, selectedService, setSelectedService)}
      {renderCheckboxGroup("Bar Association", barOptions, selectedBar, setSelectedBar)}
    </div>
  );
};

export default Filters;
