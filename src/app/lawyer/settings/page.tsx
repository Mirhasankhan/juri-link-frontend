"use client";

import LawyerProfile from "@/components/profile/LawyerProfile";

export default function LawyerSettingsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <div className="mb-6 pb-4 border-b border-slate-100">
          <h1 className="text-xl font-bold text-slate-900 leading-tight">
            Profile & Practice Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Update your professional information, consultation rates, profile avatar, and introduction video
          </p>
        </div>
        <LawyerProfile />
      </div>
    </div>
  );
}
