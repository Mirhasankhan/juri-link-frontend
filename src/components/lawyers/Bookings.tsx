"use client";

import { useLawyerBookingsQuery, useMarkCompletedMutation } from "@/redux/features/bookings/bookingsApi";
import {
  Video,
  CalendarDays,
  Clock,
  User,
  Briefcase,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function BookingList() {
  const { data: allBookings, isLoading } = useLawyerBookingsQuery("");
  const [markCompleted] = useMarkCompletedMutation()

  if (isLoading) return "Loading...";

  const bookings = allBookings?.data?.bookings;
  const handleMarkCompleted = async(id:string)=>{
    const response = await markCompleted(id)
    console.log(response);
  }

  return (
    <div className="grid grid-cols-1 mt-6 md:grid-cols-3 gap-6">
      {bookings.map((b: any) => {
        const isOnline = b.serviceType === "Online";
        const isRefund = b.status === "refundRequest";
        const isActive = b.status === "Active";

        return (
          <div
            key={b._id}
            className="relative rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all border dark:border-gray-800"
          >
            <div
              className={`h-1 w-full ${
                isRefund
                  ? "bg-red-600"
                  : isOnline
                  ? "bg-blue-500"
                  : "bg-green-600"
              }`}
            />
            <div className="flex items-center justify-between p-4">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  isRefund
                    ? "bg-red-100 text-red-700"
                    : isOnline
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {isRefund
                  ? "Refund Requested"
                  : isOnline
                  ? "Online"
                  : "In-Person"}
              </span>

              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  b.status === "Completed"
                    ? "bg-gray-200 text-gray-800"
                    : isActive
                    ? "bg-yellow-100 text-yellow-700"
                    : isRefund
                    ? "bg-red-200 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {b.status}
              </span>
            </div>
            {(isRefund || b.status === "Cancelled") && (
              <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm rounded-[5px] mx-4 mb-3 flex flex-col gap-2">
                <p className="flex items-start gap-2">
                  <AlertCircle size={18} />
                  {isRefund
                    ? b.refundReason || "No reason provided by client."
                    : b.cancelReason || "No reason provided by client."}
                </p>

                {isRefund && (
                  <button className="mt-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-[5px] text-sm font-medium">
                    <Video size={18} />
                    Send Message / Convince
                  </button>
                )}
              </div>
            )}
            <div className="px-5 py-4 space-y-3">
              <p className="flex items-center gap-2 text-gray-800 dark:text-gray-300 font-medium">
                <User size={18} className="opacity-70" />
                {b.userId.fullName}
              </p>

              <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Briefcase size={18} className="opacity-70" />
                {b.serviceId.serviceName}
              </p>

              <p className="text-gray-800 dark:text-gray-200 font-semibold">
                Fee: ${b.fee}
              </p>

              <div className="space-y-2 pt-2">
                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <CalendarDays size={18} className="opacity-70" />
                  {new Date(b.date).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Clock size={18} className="opacity-70" />
                  {b.time}
                </p>

                {!isOnline && !isRefund && (
                  <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <MapPin size={18} className="opacity-70" />
                    Office Visit
                  </p>
                )}
                {!isRefund && isOnline && b.startUrl && isActive && (
                  <a
                    href={b.startUrl}
                    target="_blank"
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium px-2 py-1 rounded-[5px] hover:bg-blue-100 dark:hover:bg-blue-900/20 transition"
                  >
                    <Video size={18} className="opacity-80" />
                    Start Session
                  </a>
                )}
              </div>
            </div>

            <div className="p-4 border-t bg-gray-50 dark:bg-gray-800/40 flex flex-col gap-3">
              {isActive && !isRefund && (
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={()=> handleMarkCompleted(b._id)} className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-[5px] text-sm font-medium">
                    <CheckCircle size={18} />
                    Mark Completed
                  </button>

                  {b.status !== "Completed" && (
                    <button className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-[5px] text-sm font-medium">
                      <XCircle size={18} />
                      Cancel
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
