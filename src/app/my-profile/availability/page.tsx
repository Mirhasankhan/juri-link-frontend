"use client";

import LawyerAvailabilities from "@/components/lawyers/LawyerAvailabilities";
import WeeklyAvailabilityPage from "@/components/lawyers/WeeklyAvailability";
import Sidebar from "@/components/profile/Sidebar";
import { useProfileQuery } from "@/redux/features/auth/authApi";
import Container from "@/utils/Container";

const AvailabilityPage = () => {
  const { data: profile, isLoading } = useProfileQuery("");
  if (isLoading) {
    return "loading....";
  }
  return (
    <div className="bg-[#f8f8f8]">
      <Container>
        <div className="grid  grid-cols-4 gap-6">
          <div className="hidden md:block md:col-span-1 border-r-2">
            <Sidebar></Sidebar>
          </div>
          <div className="col-span-4 bg-white md:col-span-3">
            {profile?.data?.availabilitySetup == true ? (
              <LawyerAvailabilities/>
            ) : (
              <WeeklyAvailabilityPage />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AvailabilityPage;
