"use client";

import LawyerAvailabilities from "@/components/lawyers/LawyerAvailabilities";
import WeeklyAvailabilityPage from "@/components/profile/WeeklyAvailability";
import { useProfileQuery } from "@/redux/features/auth/authApi";
import { Loader2 } from "lucide-react";

export default function LawyerAvailabilityPage() {
  const { data: profile, isLoading } = useProfileQuery("", {
    refetchOnMountOrArgChange: true,
  });

  const isConfigured = profile?.data?.availabilitySetup === true;

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              Availability & Scheduling
            </h1>            
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure your weekly consultation schedule and manage daily booking slots
          </p>
        </div>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-16 text-center flex flex-col items-center justify-center">
          <Loader2 size={32} className="text-primary animate-spin mb-3" />
          <p className="text-xs text-slate-500 font-medium">Loading schedule configuration...</p>
        </div>
      ) : isConfigured ? (
        <LawyerAvailabilities />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
          <WeeklyAvailabilityPage />
        </div>
      )}
    </div>
  );
}
