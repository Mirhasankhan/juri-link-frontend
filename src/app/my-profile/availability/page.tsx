"use client";

import LawyerAvailabilities from "@/components/lawyers/LawyerAvailabilities";
import WeeklyAvailabilityPage from "@/components/profile/WeeklyAvailability";
import Sidebar from "@/components/profile/Sidebar";
import { useProfileQuery } from "@/redux/features/auth/authApi";

const AvailabilityPage = () => {
  const { data: profile, isLoading } = useProfileQuery("");
  if (isLoading) {
    return "loading....";
  }
  return (
 
      <>
        <div className="grid  grid-cols-5 gap-6">
          <div className="hidden md:block md:col-span-1 border-r-2">
            <Sidebar></Sidebar>
          </div>
          <div className="col-span-4 bg-white md:col-span-4">
            {profile?.data?.availabilitySetup == true ? (
              <LawyerAvailabilities/>
            ) : (
              <WeeklyAvailabilityPage />
            )}
          </div>
        </div>
      </>

  );
};

export default AvailabilityPage;
