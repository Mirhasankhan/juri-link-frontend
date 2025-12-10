"use client";

import LawyerProfile from "@/components/profile/LawyerProfile";
import Sidebar from "@/components/profile/Sidebar";
import UserProfile from "@/components/profile/UserProfile";
import { JWTDecode } from "@/utils/jwt";

const ManageProfile = () => {
  const { decoded } = JWTDecode();
  return (
    <div className="grid  grid-cols-5 gap-6">
      <div className="hidden md:block md:col-span-1 border-r-2">
        <Sidebar></Sidebar>
      </div>
      <div className="col-span-4 bg-white md:col-span-4">
        {decoded?.role == "User" ? (
          <UserProfile></UserProfile>
        ) : (
          <LawyerProfile></LawyerProfile>
        )}
      </div>
    </div>
  );
};

export default ManageProfile;
