"use client"
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import React from "react";

const DropDownMenus = () => {
    const { email,name, role } = useAppSelector(useCurrentUser);
  return (
    <div className="border bg-white rounded-[4px] h-48 w-60">
      <div className="flex items-center gap-2 border-b p-2 pb-4">
        <Image
          className="h-12 rounded-full w-12 object-cover"
          height={20}
          width={20}
          alt=""
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
        ></Image>
        <div>
            <h1 className="font-medium pb-0">{name}</h1>
            <small className="pt-0">{role}</small>
        </div>
      </div>
      <div className="">
        <div className="flex items-center p-2 hover:bg-gray-300 gap-4">
            <CircleUser></CircleUser>
            <h1 className="font-medium">{email}</h1>
        </div>
      </div>
    </div>
  );
};

export default DropDownMenus;
