"use client";

import WeeklyAvailabilityPage from "@/components/lawyers/WeeklyAvailability";
import Sidebar from "@/components/profile/Sidebar";
import Container from "@/utils/Container";

const AvailabilityPage = () => {
  return (
    <Container>
      <div className="grid grid-cols-4 gap-6">
        <div className="hidden md:block md:col-span-1 border-r-2">
          <Sidebar></Sidebar>
        </div>
        <div className="col-span-4 md:col-span-3">
         <WeeklyAvailabilityPage/>
        </div>
      </div>
    </Container>
  );
};

export default AvailabilityPage;