"use client";

import LawyerBookings from "@/components/lawyers/LawyerBookings";

export default function LawyerOrdersPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <LawyerBookings />
      </div>
    </div>
  );
}
