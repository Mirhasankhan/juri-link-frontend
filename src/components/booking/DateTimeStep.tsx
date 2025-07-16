import React, { useState } from "react";
import { Calendar, Clock } from "lucide-react";

interface DateTimeStepProps {
  onNext: () => void;
  onSelect: (date: string, timeSlot: string) => void;
}

const DateTimeStep: React.FC<DateTimeStepProps> = ({ onNext, onSelect }) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");

  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split("T")[0],
        display: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        dayName: date.toLocaleDateString("en-US", { weekday: "long" }),
      });
    }

    return dates;
  };

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
  ];

  const dates = generateDates();

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    if (selectedTimeSlot) {
      onSelect(date, selectedTimeSlot);
    }
  };

  const handleTimeSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
    if (selectedDate) {
      onSelect(selectedDate, timeSlot);
    }
  };

  const handleNext = () => {
    if (selectedDate && selectedTimeSlot) {
      onNext();
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Select Date & Time
        </h2>
        <p className="text-gray-600">
          Choose your preferred appointment date and time slot
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={20} className="text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">Select Date</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {dates.map((date) => {
            const isSelected = selectedDate === date.value;

            return (
              <div
                key={date.value}
                onClick={() => handleDateSelect(date.value)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 text-center ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 shadow-lg"
                    : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                }`}
              >
                <div
                  className={`text-sm ${
                    isSelected ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {date.dayName}
                </div>
                <div
                  className={`text-lg font-semibold ${
                    isSelected ? "text-blue-800" : "text-gray-800"
                  }`}
                >
                  {date.display.split(", ")[1]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={20} className="text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800">Select Time</h3>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {timeSlots.map((timeSlot) => {
              const isSelected = selectedTimeSlot === timeSlot;
              const isUnavailable = Math.random() < 0.2; // Simulate some unavailable slots

              return (
                <button
                  key={timeSlot}
                  onClick={() => !isUnavailable && handleTimeSelect(timeSlot)}
                  disabled={isUnavailable}
                  className={`p-3 rounded-lg border-2 transition-all duration-300 text-sm font-medium ${
                    isUnavailable
                      ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                      : isSelected
                      ? "border-blue-500 bg-blue-50 text-blue-700 shadow-md"
                      : "border-gray-200 hover:border-blue-300 hover:shadow-sm text-gray-700"
                  }`}
                >
                  {timeSlot}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-end pt-6">
        <button
          onClick={handleNext}
          disabled={!selectedDate || !selectedTimeSlot}
          className="px-6 rounded-xl items-center bg-primary text-xl text-white  py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default DateTimeStep;
