"use client";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import SignOut from "../SignOut";
import Image from "next/image";
import { Bell, CircleDollarSign, CircleUser, Settings } from "lucide-react";
import Link from "next/link";

const DropDownMenus = ({ setActive }: { setActive: any }) => {
  const { name, email } = useAppSelector(useCurrentUser);

  return (
    <div onClick={()=>setActive(false)} className="border bg-white rounded-[4px] z-40 min-h-60 w-[320px]">
      <div>
        <div className="p-3 bg-gradient-to-r from-primary/10 to-[#f8f8f8] w-full flex items-center gap-1">
          <Image
            className="h-12 rounded-full w-12 object-cover"
            height={20}
            width={20}
            alt=""
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
          ></Image>
          <div>
            <h1 className="font-semibold">{name}</h1>
            <h1 className="text-sm text-gray-600">{email}</h1>
          </div>
        </div>
        <div className="p-2 border-b">
          <Link href="/my-profile/manage-profile" className="flex gap-2 items-center hover:bg-primary/10 py-2 px-4 rounded-[6px]">
            <CircleUser size={20} className="text-primary "></CircleUser>
            <h1 className="font-medium">My Account</h1>
          </Link>

          <Link href="/my-profile/manage-bookings" className="flex gap-2 items-center hover:bg-primary/10 py-2 px-4 rounded-[6px]">
            <Bell size={20} className="text-primary "></Bell>
            <h1 className="font-medium">Booking History</h1>
          </Link>
          <Link href="/my-profile/manage-earnings" className="flex gap-2 items-center hover:bg-primary/10 py-2 px-4 rounded-[6px]">
            <CircleDollarSign size={20} className="text-primary "></CircleDollarSign>
            <h1 className="font-medium">Earnings</h1>
          </Link>
         
          <div className="flex gap-2 my-1 items-center hover:bg-primary/10 py-2 px-4 rounded-[6px]">
            <Settings size={20} className="text-primary "></Settings>
            <h1 className="font-medium">Settings</h1>
          </div>
        </div>
      </div>

      <div onClick={() => setActive(false)}>
        <SignOut></SignOut>
      </div>
    </div>
  );
};

export default DropDownMenus;
