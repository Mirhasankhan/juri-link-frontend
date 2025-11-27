"use client";

import { useUserBookingsQuery } from "@/redux/features/bookings/bookingsApi";
import { FaVideo } from "react-icons/fa";

const UserBookings = () => {
  const { data, isLoading } = useUserBookingsQuery("");

  const bookings = data?.data?.bookings || [];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading bookings...</p>
      </div>
    );

  if (!bookings.length)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">No bookings available</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {bookings.map((b: any) => (
        <div
          key={b._id}
          className={`relative bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 ${
            b.serviceType === "Online" ? "ring-2 ring-blue-200" : ""
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold text-gray-800">
              {b.serviceId.serviceName}
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                b.status === "Active"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {b.status}
            </span>
          </div>

          {/* Details */}
          <div className="mt-4 space-y-2 text-gray-700">
            <p>
              <span className="font-medium">Lawyer:</span> {b.lawyerId.fullName}
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {new Date(b.date).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Time:</span> {b.time}
            </p>

            {/* Online vs In-Person */}
            {b.serviceType === "Online" ? (
              <a
                href={b.joinUrl}
                target="_blank"
                className="mt-4 inline-flex items-center gap-3 text-blue-600  font-semibold py-3 px-5 rounded-full shadow-lg transform transition-all hover:scale-105"
              >
                <div className=" bg-white rounded-full text-blue-600">
                  <FaVideo size={18} />
                </div>
                Join Meeting
              </a>
            ) : (
              <p className="mt-4">
                <span className="font-medium">Location:</span>{" "}
                {b.lawyerId.location}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            {b.status === "Active" && (
              <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-[5px] transition">
                Cancel Booking
              </button>
            )}
            {b.status === "Completed" && (
              <>
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-[5px] transition">
                  Give Review
                </button>
                <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-[5px] transition">
                  Ask for Refund
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserBookings;
