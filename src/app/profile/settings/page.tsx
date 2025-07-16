import ChangePassword from "@/components/profile/ChangePassword";
import Sidebar from "@/components/profile/Sidebar";
import Container from "@/utils/Container";
import React from "react";

const SettingsPage = () => {
  return (
    <Container>
      <div className="grid grid-cols-4 gap-6 my-6">
        <div className="hidden md:block md:col-span-1 border-r-2">
          <Sidebar></Sidebar>
        </div>
        <div className="md:col-span-3 col-span-4">
          <h1 className="text-center pb-8 text-xl font-medium">Change Your Password</h1>
          <ChangePassword></ChangePassword>
        </div>
      </div>
    </Container>
  );
};

export default SettingsPage;
