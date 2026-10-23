"use client";

import LawyerAvailabilities from "@/components/lawyers/LawyerAvailabilities";
import WeeklyAvailabilityPage from "@/components/profile/WeeklyAvailability";
import { useProfileQuery } from "@/redux/features/auth/authApi";
import { useState } from "react";
import { RotateCcw, CheckCircle2, Loader2 } from "lucide-react";

export default function LawyerAvailabilityPage() {
  const { data: profile, isLoading } = useProfileQuery("", {
    refetchOnMountOrArgChange: true,
  });
  const [forceSetupMode, setForceSetupMode] = useState(false);

  const isConfigured = profile?.data?.availabilitySetup === true;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Banner / Switch Mode */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 leading-tight">
              Availability & Scheduling
            </h1>
            {isConfigured && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                <CheckCircle2 size={12} className="text-emerald-500" />
                Active
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure the days and time slots when clients can book legal consultations with you
          </p>
        </div>

        {isConfigured && (
          <button
            onClick={() => setForceSetupMode(!forceSetupMode)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-primary/50 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-all shadow-xs"
          >
            <RotateCcw size={14} />
            <span>
              {forceSetupMode ? "View Active Slots" : "Re-configure Weekly Schedule"}
            </span>
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        {isLoading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <Loader2 size={36} className="text-primary animate-spin mb-3" />
            <p className="text-xs text-slate-500">Loading schedule configuration...</p>
          </div>
        ) : isConfigured && !forceSetupMode ? (
          <LawyerAvailabilities />
        ) : (
          <WeeklyAvailabilityPage />
        )}
      </div>
    </div>
  );
}
