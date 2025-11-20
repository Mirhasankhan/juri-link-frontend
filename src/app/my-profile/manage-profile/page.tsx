"use client";

import Sidebar from "@/components/profile/Sidebar";
import Container from "@/utils/Container";

const MyProfilePage = () => {
  return (
    <Container>
      <div className="grid grid-cols-4 gap-6">
        <div className="hidden md:block md:col-span-1 border-r-2">
          <Sidebar></Sidebar>
        </div>
        <div className="col-span-4 md:col-span-3">
          <h1 className="text-xl font-semibold pb-4">Manage profile</h1>
        </div>
      </div>
    </Container>
  );
};

export default MyProfilePage;
