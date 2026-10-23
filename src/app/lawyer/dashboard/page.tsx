"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CalendarCheck,
  CircleDollarSign,
  CalendarClock,
  Crown,
  MessageSquare,
  Video,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useProfileQuery } from "@/redux/features/auth/authApi";
import { useLawyerBookingsQuery } from "@/redux/features/bookings/bookingsApi";
import { useEarningsSummaryQuery } from "@/redux/features/earnings/earnings.api";
import { SkeletonCard } from "@/components/shared/Skeleton";

export default function LawyerOverviewPage() {
  const { data: profileData } = useProfileQuery("", {
    refetchOnMountOrArgChange: true,
  });
  const { data: bookingsData, isLoading: isBookingsLoading } = useLawyerBookingsQuery("");
  const { data: earningsData, isLoading: isEarningsLoading } = useEarningsSummaryQuery("monthly");

  const lawyer = profileData?.data;
  const bookings = bookingsData?.data?.bookings || [];

  const allTimeEarnings = earningsData?.data?.allTimeEarnings ?? 0;
  const currentEarnings = earningsData?.data?.currentEarnings ?? 0;

  // Filter upcoming bookings
  const upcomingBookings = bookings
    .filter((b: any) => b.status === "Pending" || b.status === "Confirmed" || !b.isCompleted)
    .slice(0, 4);

  const completedCount = bookings.filter((b: any) => b.status === "Completed" || b.isCompleted).length;

  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#21576d] via-[#2e7999] to-[#2b645c] p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-white">
              <Sparkles size={13} className="text-amber-300" />
              <span>Lawyer Control Center</span>
              <span className="opacity-60">•</span>
              <span className="font-normal capitalize">{todayStr}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {lawyer?.fullName || "Counselor"}!
            </h1>
            <p className="text-white/80 text-sm max-w-xl leading-relaxed">
              Here is your legal practice snapshot. You have{" "}
              <span className="font-bold text-white underline decoration-amber-300 decoration-2">
                {upcomingBookings.length} upcoming consultations
              </span>{" "}
              and your account is currently in good standing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/lawyer/availability"
              className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-semibold text-xs shadow hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <CalendarClock size={16} className="text-primary" />
              <span>Set Availability</span>
            </Link>
            <Link
              href="/lawyer/orders"
              className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-xs transition-all flex items-center gap-2"
            >
              <CalendarCheck size={16} />
              <span>View Bookings</span>
            </Link>
          </div>
        </div>

        {/* Decorative backdrop shapes */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-40 -top-10 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Earnings */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Earnings
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {isEarningsLoading ? "..." : `$${allTimeEarnings.toLocaleString()}`}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
            <CheckCircle2 size={13} className="text-emerald-500" />
            <span>Lifetime client revenue</span>
          </div>
        </div>

        {/* Available Balance */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Available Balance
            </span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <CircleDollarSign size={20} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {isEarningsLoading ? "..." : `$${currentEarnings.toLocaleString()}`}
          </div>
          <div className="mt-2">
            <Link
              href="/lawyer/earnings"
              className="text-xs font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1"
            >
              <span>Request payout</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* Total Consultations */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Bookings
            </span>
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <CalendarCheck size={20} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {isBookingsLoading ? "..." : bookings.length}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{completedCount}</span>
            <span>completed consultations</span>
          </div>
        </div>

        {/* Schedule & Availability Status */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Schedule Status
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CalendarClock size={20} />
            </div>
          </div>
          <div className="text-lg font-bold text-slate-900 flex items-center gap-2">
            {lawyer?.availabilitySetup ? (
              <span className="text-emerald-600 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Slots
              </span>
            ) : (
              <span className="text-amber-600">Pending Setup</span>
            )}
          </div>
          <div className="mt-2">
            <Link
              href="/lawyer/availability"
              className="text-xs font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1"
            >
              <span>Manage schedule</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols) - Upcoming Client Consultations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 leading-tight">
                  Upcoming Consultations
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Scheduled video appointments and legal meetings with clients
                </p>
              </div>
              <Link
                href="/lawyer/orders"
                className="text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1"
              >
                <span>View all</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            {isBookingsLoading ? (
              <div className="space-y-3">
                <SkeletonCard height={80} />
                <SkeletonCard height={80} />
              </div>
            ) : upcomingBookings.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                  <Calendar size={22} />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">
                  No upcoming consultations
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Your upcoming client bookings will appear here. Make sure your availability slots are up to date so clients can book sessions.
                </p>
                <Link
                  href="/lawyer/availability"
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white font-semibold text-xs shadow-xs hover:bg-primary/90 transition-colors"
                >
                  <CalendarClock size={14} />
                  <span>Configure Available Hours</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-3.5">
                {upcomingBookings.map((b: any) => {
                  const client = b.userId || {};
                  const dateStr = b.date
                    ? new Date(b.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Scheduled";

                  return (
                    <div
                      key={b._id}
                      className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/40 hover:bg-white hover:border-primary/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <Image
                          src={
                            client.profileImage ||
                            "https://res.cloudinary.com/dddrm7ep8/image/upload/v1781532954/y7gdxfkl9uznjt96cjea.png"
                          }
                          alt={client.fullName || "Client"}
                          width={44}
                          height={44}
                          unoptimized
                          className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/20 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-slate-900">
                              {client.fullName || "Client"}
                            </h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                              {b.status || "Upcoming"}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar size={13} className="text-slate-400" />
                              {dateStr}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={13} className="text-slate-400" />
                              {b.time || "Scheduled Slot"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {b.zoomLink ? (
                          <a
                            href={b.zoomLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-all"
                          >
                            <Video size={14} />
                            <span>Join Video Call</span>
                          </a>
                        ) : null}

                        {client._id && (
                          <Link
                            href={`/lawyer/messages?receiverId=${client._id}`}
                            className="p-2 rounded-xl border border-slate-200 bg-white hover:border-primary hover:text-primary text-slate-600 transition-colors shadow-xs"
                            title="Message Client"
                          >
                            <MessageSquare size={16} />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Actions Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/lawyer/availability"
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-primary/40 hover:shadow-md transition-all group flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <CalendarClock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">
                  Availability Schedule
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Adjust working days, opening hours, and consultation time slots.
                </p>
              </div>
            </Link>

            <Link
              href="/lawyer/earnings"
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-primary/40 hover:shadow-md transition-all group flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <CircleDollarSign size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">
                  Payouts & Earnings
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Request earnings withdrawal and track bank transfer histories.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Right Column (1 Col) - Practice Profile & Premium Badge */}
        <div className="space-y-6">
          {/* Lawyer Status & Rate Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
            <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
              <ShieldCheck size={18} className="text-primary" />
              <span>Practice Profile</span>
            </h3>

            <div className="space-y-3.5 text-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-slate-500 text-xs">Hourly Rate</span>
                <span className="font-bold text-slate-900">
                  ${lawyer?.fee || 0} / session
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-slate-500 text-xs">Bar Association</span>
                <span className="font-medium text-slate-900 truncate max-w-[150px]">
                  {lawyer?.barAssociation || "Not Specified"}
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-slate-500 text-xs">Experience</span>
                <span className="font-medium text-slate-900">
                  {lawyer?.experience || 0} years
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-xs">Licence</span>
                <span className="font-mono text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                  Verified
                </span>
              </div>
            </div>

            <Link
              href="/lawyer/settings"
              className="mt-6 w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 hover:text-primary hover:border-primary/40 transition-all shadow-xs"
            >
              <span>Edit Practice Details</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Premium Membership Banner Card */}
          <div className="rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-6 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Crown size={22} />
              </div>
              <div>
                <h4 className="font-extrabold text-lg text-white">
                  Lawyer Premium Tier
                </h4>
                <p className="text-xs text-white/85 mt-1 leading-relaxed">
                  Gain priority listing on the client attorney directory, verified counselor badges, and advanced scheduling perks.
                </p>
              </div>

              <Link
                href="/lawyer/premium"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-amber-900 font-bold text-xs shadow hover:bg-amber-50 transition-colors"
              >
                <span>Explore Premium Plans</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
