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
        <div className="grid  grid-cols-5 gap-6 p-6">
          <div className="lg:col-span-1">
            <Sidebar></Sidebar>
          </div>
          <div className="col-span-5 bg-white rounded-[8px] lg:col-span-4">
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
