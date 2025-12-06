"use client";

import Sidebar from "@/components/profile/Sidebar";
import UpdateIntroVideo from "@/components/profile/UpdateIntroVideo";

const ManageProfile = () => {
  return (
    <div className="grid  grid-cols-5 gap-6">
      <div className="hidden md:block md:col-span-1 border-r-2">
        <Sidebar></Sidebar>
      </div>
      <div className="col-span-4 bg-white md:col-span-4">
        <UpdateIntroVideo></UpdateIntroVideo>
      </div>
    </div>
  );
};

export default ManageProfile;
