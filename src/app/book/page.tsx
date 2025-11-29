"use client";
import Container from "@/utils/Container";
import { Calendar, Clock, Clock1, DollarSign, User, Video } from "lucide-react";
import Image from "next/image";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { useLawyerDetailsQuery } from "@/redux/features/auth/authApi";
import { useState } from "react";
import StripeModal from "@/components/shared/CreatePayment";
import { useDayWiseSlotsQuery } from "@/redux/features/availability/availability.api";

const BookingPage = () => {
  const searchParams = useSearchParams();
  const lawyerId = searchParams.get("lawyerId");

  // ALWAYS RUN HOOKS (never behind a return)
  const { data: lawyerData, isLoading: lawyerLoading } =
    useLawyerDetailsQuery(lawyerId);

  const lawyer = lawyerData?.data?.lawyer;

  const [selectedDate, setSelectedDate] = useState("");
  const [dayNumber, setDayNumber] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [consultationType, setConsultationType] = useState("");
  const [selectedLawArea, setSelectedLawArea] = useState("");
  const [description, setDescription] = useState("");
  const [serviceId, setServiceId] = useState("");

  // SLOT HOOK ALWAYS EXECUTES — SKIP HANDLES CONDITIONALITY
  const { data: slotData, isLoading: slotLoading } = useDayWiseSlotsQuery(
    { day: dayNumber ?? 0, lawyerId },
    { skip: dayNumber === null }
  );

  // Convert date → weekday (0–6)
  const handleDateChange = (value: string) => {
    setSelectedDate(value);
    const day = new Date(value).getDay();
    setDayNumber(day);
    setSelectedTime("");
  };

  const handleLawAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value;
    setSelectedLawArea(name);

    const service = lawyer?.specialization?.find(
      (x: any) => x.serviceName === name
    );
    setServiceId(service?._id || "");
  };

  const consultationOptions =
    lawyer?.serviceType === "Both"
      ? ["Online", "In_Person"]
      : lawyer?.serviceType === "Online"
      ? ["Online"]
      : ["In_Person"];

  const isFormComplete =
    selectedDate &&
    selectedTime &&
    consultationType &&
    serviceId &&
    description;

  return (
    <div className="bg-[#f8f8f8] py-12">
      <Container>
        {/* Skeleton if lawyer loading but still allowing hooks to run */}
        {lawyerLoading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-1">
              <Image
                alt={lawyer?.fullName}
                height={200}
                width={700}
                className="border-2 h-16 w-16 rounded-full object-cover"
                src={
                  lawyer?.profileImage ||
                  "https://nyc3.digitaloceanspaces.com/smtech-space/uploads/messages/files/1763556920491-62my97cxpb4.png"
                }
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
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full border rounded-[4px] mt-2 p-2"
                  />
                </div>

                {/* Dynamic Slots */}
                <div className="border mt-4 bg-white p-6 rounded-[6px]">
                  <div className="flex items-center pb-2 gap-1">
                    <Clock className="text-primary" />
                    <p className="font-medium text-gray-700">Available Slots</p>
                  </div>

                  {slotLoading && <p>Loading slots...</p>}

                  {!slotLoading &&
                    (dayNumber === null || slotData?.data?.length === 0) && (
                      <p className="text-red-500">
                        Select A Date To Get Lawyer Available Slots{" "}
                      </p>
                    )}

                  <div className="grid grid-cols-3 gap-5">
                    {!slotLoading &&
                      slotData?.data?.map((slot: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedTime(slot.start)}
                          className={`border py-2 rounded-[4px] text-center font-medium ${
                            selectedTime === slot.start
                              ? "bg-primary text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {slot.start}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Consultation Type */}
                <div className="border mt-4 bg-white p-6 rounded-[6px]">
                  <h1 className="font-medium pb-2">Consultation Type</h1>
                  <div className="flex gap-5">
                    {consultationOptions.map((type) => (
                      <div
                        key={type}
                        onClick={() => setConsultationType(type)}
                        className={`flex items-center border rounded-[6px] p-3 gap-2 w-full cursor-pointer ${
                          consultationType === type
                            ? "border-primary bg-blue-50"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          checked={consultationType === type}
                          onChange={() => setConsultationType(type)}
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
                    value={selectedLawArea}
                    onChange={handleLawAreaChange}
                    className="w-full border p-2 rounded-[4px]"
                  >
                    <option value="">Select specialization</option>
                    {lawyer?.specialization?.map((area: any, i: number) => (
                      <option key={i} value={area.serviceName}>
                        {area.serviceName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <label className="block pb-2 font-medium">
                    Describe your need shortly
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write short description"
                    className="w-full border rounded-[4px] p-2"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="col-span-1 bg-white rounded-[6px] sticky top-8 max-h-[480px] font-medium">
                <div className="flex bg-primary/70 text-white py-8 justify-center gap-2 rounded-t-[12px]">
                  <IoMdCheckmarkCircleOutline size={25} />
                  <h1 className="font-medium">Booking Summary</h1>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex border-b py-3 justify-between">
                    <div className="flex items-center gap-1">
                      <Calendar
                        size={30}
                        className="p-1 bg-gray-100 rounded-[5px] text-gray-800"
                      ></Calendar>
                      <span className="font-medium">Date:</span>
                    </div>
                    <span className="font-medium border bg-gray-100 px-3 rounded-[5px] text-gray-700">
                      {selectedDate || "Not selected"}
                    </span>
                  </div>

                  <div className="flex border-b py-3 justify-between">
                    <div className="flex items-center gap-1">
                      <Clock1
                        size={30}
                        className="p-1 bg-gray-100 rounded-[5px] text-gray-800"
                      ></Clock1>
                      <span className="font-medium">Time:</span>
                    </div>

                    <span className="font-medium border bg-gray-100 px-3 rounded-[5px] text-gray-700">
                      {selectedTime || "Not selected"}
                    </span>
                  </div>

                  <div className="flex border-b py-3 justify-between">
                    <div className="flex items-center gap-1">
                      <DollarSign
                        size={30}
                        className="p-1 bg-gray-100 rounded-[5px] text-gray-800"
                      ></DollarSign>
                      <span className="font-medium">Fee:</span>
                    </div>
                    <span className="font-medium">${lawyer?.fee ?? "—"}</span>
                  </div>

                  <div className="flex border-b py-3 justify-between">
                    <div className="flex items-center gap-1">
                      {consultationType == "Online" ? (
                        <Video
                          size={30}
                          className="p-1 bg-gray-100 rounded-[5px] text-gray-800"
                        ></Video>
                      ) : (
                        <User
                          size={30}
                          className="p-1 bg-gray-100 rounded-[5px] text-gray-800"
                        ></User>
                      )}

                      <span className="font-medium">Consultation Type:</span>
                    </div>
                    <span className="font-medium border bg-gray-100 px-3 rounded-[5px] text-gray-700">
                      {consultationType || "Not selected"}
                    </span>
                  </div>

                  <div className="flex border-b py-3 justify-between">
                    <div className="flex items-center gap-1">
                      <DollarSign
                        size={30}
                        className="p-1 bg-gray-100 rounded-[5px] text-gray-800"
                      ></DollarSign>
                      <span className="font-medium">Service Type:</span>
                    </div>

                    <span className="font-medium border bg-gray-100 px-3 rounded-[5px] text-gray-700">
                      {selectedLawArea || "Not selected"}
                    </span>
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
          </>
        )}
      </Container>
    </div>
  );
};

export default BookingPage;
