"use client";

import { useLawyerBookingsQuery, useMarkCompletedMutation } from "@/redux/features/bookings/bookingsApi"; // make sure this API exists
import { Calendar, Clock, MapPin, Video } from "lucide-react";
import Image from "next/image";
import { SkeletonCard } from "../shared/Skeleton";
import CancelBookingModal from "./CancelBookingModal";

const LawyerBookings = () => {
  const { data, isLoading } = useLawyerBookingsQuery(""); 
  const [markCompleted, {isLoading: isCompleteLoading}] = useMarkCompletedMutation()
  const bookings = data?.data?.bookings;

  const isToday = (date: string | Date) => {
    const d = new Date(date);
    const today = new Date();
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  };

  const handleMarkCompleted =async (bookingId: string) => {
    const response = await markCompleted(bookingId)

    console.log(response);
  };

  return (
    <div>
      <h1 className="font-medium text-xl mt-4">My Bookings</h1>
      <p className="text-gray-500 pb-6">Manage your client consultations</p>

      {isLoading && (
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <SkeletonCard height={350} key={idx} />
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {bookings?.map((booking: any) => (
          <div className="border p-4 rounded-[10px] bg-white" key={booking._id}>
            <div className="flex pb-5 border-b justify-between">
              <div className="flex gap-2">
                <Image
                  className="h-12 w-12 rounded-full"
                  src={booking?.userId?.profileImage}
                  alt=""
                  height={80}
                  width={80}
                />
                <div>
                  <h1 className="text-xl font-medium">{booking?.userId?.fullName}</h1>
                  <p className="text-gray-600 text-sm">{booking?.serviceId?.serviceName}</p>
                </div>
              </div>
              <h1
                className={`self-start text-sm text-white px-2 rounded-[10px] font-medium ${
                  booking.status === "Active"
                    ? "bg-secondary"
                    : booking.status === "Completed"
                    ? "bg-primary"
                    : "bg-red-600"
                }`}
              >
                {booking.status}
              </h1>
            </div>

            <div className="flex mt-3 gap-1 items-center">
              <Calendar size={15} className="text-gray-600" />
              <h1 className="text-gray-700 text-sm">
                {new Date(booking.date).toLocaleDateString("en-GB", {
                  timeZone: "UTC",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </h1>
            </div>

            <div className="flex mt-3 gap-1 items-center">
              <Clock size={15} className="text-gray-600" />
              <h1 className="text-gray-700 text-sm">{booking.time}</h1>
            </div>

            {booking.serviceType === "Online" ? (
              <div className="flex border-b pb-4 mt-3 gap-1 items-center">
                <Video size={15} className="text-gray-600" />
                <h1 className="text-gray-700 text-sm">Online Consultation</h1>
              </div>
            ) : (
              <div className="flex border-b pb-4 mt-3 gap-1 items-center">
                <MapPin size={15} className="text-gray-600" />
                <h1 className="text-gray-700 text-sm">{booking.userId?.location || "My Chamber"}</h1>
              </div>
            )}

            <div className="flex mb-2 justify-between items-center pt-3">
              <h1 className="text-gray-600">Consultation Fee</h1>
              <h1 className="text-gray-900 text-xl font-medium">${booking.fee}</h1>
            </div>

            <div className="flex gap-3 flex-col">
              {/* Active + In_Person */}
              {booking.status === "Active" && booking.serviceType === "In_Person" && (
                <>
                  <CancelBookingModal id={booking._id} />
                  <button
                    className="bg-primary text-white py-2 w-full rounded-[6px]"
                    onClick={() => handleMarkCompleted(booking._id)}
                  >
                    Mark as Completed
                  </button>
                </>
              )}

              {/* Active + Online */}
              {booking.status === "Active" && booking.serviceType === "Online" && (
                <>
                  <CancelBookingModal id={booking._id} />

                  <button
                    onClick={() => window.open(booking.startUrl, "_blank")}
                    className="bg-secondary text-white py-2 w-full rounded-[6px] disabled:bg-gray-400"
                    disabled={!isToday(booking.date)}
                  >
                    Start Sessions
                  </button>

                  <button
                  disabled={isCompleteLoading}
                    className="bg-primary text-white py-2 w-full disabled:bg-opacity-60 rounded-[6px]"
                    onClick={() => handleMarkCompleted(booking._id)}
                  >
                    {
                      isCompleteLoading ? "Completing" :" Mark as Completed"
                    }
                   
                  </button>
                </>
              )}

              {/* Completed */}
              {booking.status === "Completed" && (
                <button className="bg-red-600 text-white py-2 w-full rounded-[6px]">
                  Report
                </button>
              )}

              {/* Cancelled */}
              {booking.status === "Cancelled" && (
                <h1 className="text-red-500">Cancel Reason: {booking?.cancelReason}</h1>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LawyerBookings;
