"use client";
import Container from "@/utils/Container";
import { Calendar, Clock, Video } from "lucide-react";
import Image from "next/image";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { useLawyerDetailsQuery } from "@/redux/features/auth/authApi";
import { useState } from "react";
import StripeModal from "@/components/shared/CreatePayment";

const BookingPage = () => {
  const searchParams = useSearchParams();
  const lawyerId = searchParams.get("lawyerId");
  const { data: lawyerData, isLoading } = useLawyerDetailsQuery(lawyerId);

  const lawyer = lawyerData?.data?.lawyer;

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [consultationType, setConsultationType] = useState("");
  const [selectedLawArea, setSelectedLawArea] = useState("");
  const [description, setDescription] = useState("");
  const [serviceId, setServiceId] = useState("");

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  const consultationOptions =
    lawyer?.serviceType === "Both"
      ? ["Online", "In_Person"]
      : lawyer?.serviceType === "Online"
      ? ["Online"]
      : ["In_Person"];

  const handleConsultationChange = (type: string) => {
    setConsultationType(type);
  };

  const handleLawAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setSelectedLawArea(selectedName);

    const selectedObj = lawyer?.specialization?.find(
      (a: any) => a.serviceName === selectedName
    );

    setServiceId(selectedObj?._id || "");
  };
 
  const isFormComplete =
    selectedDate && selectedTime && consultationType && serviceId && description;

  return (
    <div className="bg-[#f8f8f8] py-12">
      <Container>
        <div className="flex items-center gap-1">
          <Image
            alt={lawyer?.fullName}
            height={200}
            width={700}
            className="border-2 h-16 w-16 rounded-full object-cover"
            src={lawyer?.profileImage}
          />
          <div>
            <h1 className="font-medium text-3xl">Book Consultation</h1>
            <small className="text-gray-500 font-medium">
              with {lawyer?.fullName}
            </small>
          </div>
        </div>

        <div className="grid grid-cols-3 my-6 gap-6">
          <div className="col-span-2">
            {/* Date Picker */}
            <div className="border bg-white p-6 rounded-[6px]">
              <div className="flex items-center pb-2 gap-1">
                <Calendar className="text-primary" />
                <p className="font-medium text-gray-700">Select a date</p>
              </div>
              <input
                className="w-full border rounded-[4px] mt-2 p-2"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* Time Selection */}
            <div className="border mt-4 bg-white p-6 rounded-[6px]">
              <div className="flex items-center pb-2 gap-1">
                <Clock className="text-primary" />
                <p className="font-medium text-gray-700">Select time</p>
              </div>
              <div className="grid grid-cols-3 gap-5">
                {["10 AM", "11 AM", "12 PM", "2 PM", "4 PM", "6 PM"].map(
                  (time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`border text-center font-medium py-2 rounded-[4px] ${
                        selectedTime === time
                          ? "bg-primary text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {time}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Consultation Type */}
            <div className="border mt-4 bg-white p-6 rounded-[6px]">
              <h1 className="font-medium text-gray-700 pb-2">
                Consultation Type
              </h1>
              <div className="flex gap-5">
                {consultationOptions.map((type) => (
                  <div
                    key={type}
                    onClick={() => handleConsultationChange(type)}
                    className={`flex border rounded-[6px] items-center w-full p-3 gap-2 cursor-pointer ${
                      consultationType === type
                        ? "border-primary bg-blue-50"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      checked={consultationType === type}
                      onChange={() => handleConsultationChange(type)}
                    />
                    <Video className="text-primary" />
                    <div className="flex flex-col leading-none">
                      <p className="font-medium pb-1">{type}</p>
                      <small className="text-gray-500">
                        {type === "Online"
                          ? "Video call consultation"
                          : "Offline visit"}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialization */}
            <div className="border mt-4 bg-white p-6 rounded-[6px]">
              <h1 className="font-medium pb-2">Select area of law</h1>
              <select
                className="w-full p-2 rounded-[4px] border"
                value={selectedLawArea}
                onChange={handleLawAreaChange}
              >
                <option value="">Select specialization</option>
                {lawyer?.specialization?.map((area: any, idx: number) => (
                  <option key={idx} value={area.serviceName}>
                    {area.serviceName}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label
                className="block pb-2 text-gray-800 font-medium"
                htmlFor="description"
              >
                Describe your need shortly
              </label>
              <textarea
                placeholder="Write short description"
                className="w-full border rounded-[4px] p-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>   
          <div className="col-span-1 sticky font-medium top-8 max-h-[360px] bg-white rounded-[6px]">
            <div className="flex bg-primary gap-2 text-white justify-center rounded-[4px] items-center py-4">
              <IoMdCheckmarkCircleOutline size={25} />
              <h1 className="font-medium">Booking Summary</h1>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex justify-between">
                <h1 className="text-primary">Date:</h1>
                <h1 className="font-medium">{selectedDate || "Not selected"}</h1>
              </div>
              <div className="flex justify-between">
                <h1 className="text-primary">Time:</h1>
                <h1 className="font-medium">{selectedTime || "Not selected"}</h1>
              </div>
              <div className="flex justify-between">
                <h1 className="text-primary">Fee:</h1>
                <h1 className="font-medium">{lawyer?.fee || "—"}</h1>
              </div>
              <div className="flex justify-between">
                <h1 className="text-primary">Consultation Type:</h1>
                <h1 className="font-medium">{consultationType || "Not selected"}</h1>
              </div>
              <div className="flex justify-between">
                <h1 className="text-primary">Service Type:</h1>
                <h1 className="font-medium">{selectedLawArea || "Not selected"}</h1>
              </div>

              <StripeModal
                bookingData={{
                  date: selectedDate,
                  time: selectedTime,
                  serviceType: consultationType,
                  serviceId,
                  serviceDescription: description,
                  lawyerId: lawyer?._id,
                  fee: lawyer?.fee,
                }}
                disabled={!isFormComplete}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BookingPage;
