"use client";

import { useUserBookingsQuery } from "@/redux/features/bookings/bookingsApi";
import { Calendar, Clock, MapPin, Video } from "lucide-react";
import Image from "next/image";
import { SkeletonCard } from "../shared/Skeleton";
import CancelBookingModal from "./CancelBookingModal";
import GiveReviewModal from "./ReviewModal";

const UserBookings = () => {
  const { data, isLoading } = useUserBookingsQuery("");
  const bookings = data?.data?.bookings;
  console.log(bookings);

  const isToday = (date: string | Date) => {
    const d = new Date(date);
    const today = new Date();

    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  };
  return (
    <div>
      <h1 className="font-medium text-xl mt-4">My Bookings</h1>
      <p className="text-gray-500 pb-6">Manage your legal consultations</p>

      {isLoading && (
        <div className="grid grid-cols-3 gap-6">
          {bookings?.map((booking: any) => (
            <SkeletonCard key={booking._id}></SkeletonCard>
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
                  src={booking?.lawyerId?.profileImage}
                  alt=""
                  height={80}
                  width={80}
                ></Image>
                <div>
                  <h1 className="text-xl font-medium">
                    {booking?.lawyerId?.fullName}{" "}
                  </h1>
                  <p className="text-gray-600 text-sm">
                    {booking?.serviceId?.serviceName}
                  </p>
                </div>
              </div>
              <h1
                className={`self-start text-sm text-white px-2 rounded-[10px] font-medium ${
                  booking.status == "Active"
                    ? "bg-secondary"
                    : booking.status == "Completed"
                    ? "bg-primary"
                    : "bg-red-600"
                }`}
              >
                {booking?.status}
              </h1>
            </div>
            <div className="flex mt-3 gap-1 items-center">
              <Calendar size={15} className="text-gray-600"></Calendar>
              <h1 className="text-gray-700 text-sm">
                {new Date(booking.date).toLocaleDateString("en-GB", {
                  timeZone: "UTC",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </h1>
            </div>
            <div className="flex  mt-3 gap-1 items-center">
              <Clock size={15} className="text-gray-600"></Clock>
              <h1 className="text-gray-700 text-sm">{booking.time}</h1>
            </div>
            {booking.serviceType == "Online" ? (
              <div className="flex border-b pb-4 mt-3 gap-1 items-center">
                <Video size={15} className="text-gray-600"></Video>
                <h1 className="text-gray-700 text-sm">Online Consultation</h1>
              </div>
            ) : (
              <div className="flex border-b pb-4 mt-3 gap-1 items-center">
                <MapPin size={15} className="text-gray-600"></MapPin>
                <h1 className="text-gray-700 text-sm">
                  {booking.lawyerId?.location}
                </h1>
              </div>
            )}
            <div className="flex mb-2 justify-between items-center pt-3">
              <h1 className="text-gray-600">Consultation Fee</h1>
              <h1 className="text-gray-900 text-xl font-medium">
                ${booking.fee}
              </h1>
            </div>
            <div className="flex gap-3">
              {booking.status === "Active" &&
                booking.serviceType === "In_Person" && (
                  <CancelBookingModal id={booking._id}></CancelBookingModal>
                )}

              {/* ACTIVE + ONLINE */}
              {booking.status === "Active" &&
                booking.serviceType === "Online" && (
                  <>
                    <CancelBookingModal id={booking._id}></CancelBookingModal>

                    <button
                      onClick={() => {
                        window.open(booking.joinUrl, "_blank");
                      }}
                      className="bg-secondary text-white py-2 w-full rounded-[6px] disabled:bg-gray-400"
                      disabled={!isToday(booking.date)}
                    >
                      Join Session
                    </button>
                  </>
                )}

              {/* COMPLETED */}
              {booking.status === "Completed" && (
                <>
                <GiveReviewModal bookingId={booking._id} isReview={booking.isReviewed}></GiveReviewModal>

                  <button className="bg-red-600 text-white py-2 w-full rounded-[6px] disabled:bg-gray-400">
                    Report
                  </button>
                </>
              )}
              {booking.status === "Cancelled" && (
                <>
                  <h1 className="text-red-500">
                    Cancel Reason:-{booking?.cancelReason}
                  </h1>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBookings;
