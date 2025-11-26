"use client"
import BookingList from "@/components/lawyers/Bookings";
import Sidebar from "@/components/profile/Sidebar";
import { useLawyerBookingsQuery } from "@/redux/features/bookings/bookingsApi";

import React from "react";

const ManageBookingsPage = () => {
  const {data:bookings} = useLawyerBookingsQuery("")
  console.log(bookings?.data?.bookings);
  return (
    <>
      <div className="grid grid-cols-5 gap-6">
        <div className="hidden md:block md:col-span-1 border-r-2">
          <Sidebar></Sidebar>
        </div>
        <div className="col-span-5 md:col-span-4 w-4/5">
          <BookingList></BookingList>
        </div>
      </div>
    </>
  );
};

export default ManageBookingsPage;
