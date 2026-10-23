"use client";

import {
  useLawyerBookingsQuery,
  useMarkCompletedMutation,
} from "@/redux/features/bookings/bookingsApi";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  DollarSign,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Loader2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import CancelBookingModal from "./CancelBookingModal";
import CreateReportModal from "./ReportModal";
import NoBookings from "./NoBookings";
import { toast } from "react-toastify";
import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 8;

const LawyerBookings = () => {
  const { data, isLoading } = useLawyerBookingsQuery("");
  const [markCompleted] = useMarkCompletedMutation();
  const [completingId, setCompletingId] = useState<string | null>(null);

  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const rawBookings: any[] = useMemo(
    () => data?.data?.bookings || [],
    [data?.data?.bookings]
  );

  const isPastOrToday = (date: string | Date) => {
    if (!date) return false;
    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return bookingDate <= today;
  };

  const handleMarkCompleted = async (bookingId: string) => {
    setCompletingId(bookingId);
    try {
      const response: any = await markCompleted(bookingId);
      if (response?.data?.success || response?.data?.statusCode === 200) {
        toast.success(
          "Booking marked as completed. Earnings credited to your balance"
        );
      } else if (response?.error) {
        toast.error(
          response.error?.data?.message || "Failed to mark booking as completed"
        );
      } else {
        toast.success("Booking marked as completed");
      }
    } catch {
      toast.error("An unexpected error occurred while completing booking");
    } finally {
      setCompletingId(null);
    }
  };

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return rawBookings.filter((booking) => {
      // Service type filter
      if (typeFilter !== "All" && booking.serviceType !== typeFilter) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const clientName = booking?.userId?.fullName?.toLowerCase() || "";
        const clientEmail = booking?.userId?.email?.toLowerCase() || "";
        const serviceName = booking?.serviceId?.serviceName?.toLowerCase() || "";
        const location = booking?.userId?.location?.toLowerCase() || "";
        if (
          !clientName.includes(query) &&
          !clientEmail.includes(query) &&
          !serviceName.includes(query) &&
          !location.includes(query)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [rawBookings, typeFilter, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE) || 1;
  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBookings.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBookings, currentPage]);

  const toggleRowExpand = (id: string) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  const handleResetFilters = () => {
    setTypeFilter("All");
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="h-8 w-48 bg-slate-200 animate-pulse rounded-lg" />
          <div className="h-10 w-64 bg-slate-200 animate-pulse rounded-xl" />
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 space-y-2">
            <div className="h-4 w-1/4 bg-slate-200 animate-pulse rounded" />
          </div>
          <div className="divide-y divide-slate-100">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" />
                  <div className="space-y-1.5">
                    <div className="h-4 w-32 bg-slate-200 animate-pulse rounded" />
                    <div className="h-3 w-20 bg-slate-100 animate-pulse rounded" />
                  </div>
                </div>
                <div className="h-4 w-28 bg-slate-100 animate-pulse rounded hidden sm:block" />
                <div className="h-4 w-24 bg-slate-100 animate-pulse rounded" />
                <div className="h-8 w-24 bg-slate-200 animate-pulse rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If no bookings in total
  if (rawBookings.length === 0) {
    return <NoBookings />;
  }

  return (
    <div className="space-y-6">
      {/* Header & Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              Client Consultations & Orders
            </h1>            
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Monitor client bookings, start video sessions, and manage consultation outcomes
          </p>
        </div>
      </div>

      {/* Search & Service Type Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 sm:max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search client or service..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder:text-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <XCircle size={14} />
            </button>
          )}
        </div>

        {/* Type Dropdown & Reset */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none pl-3 pr-8 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer transition-all"
            >
              <option value="All">All Types</option>
              <option value="Online">Online Video</option>
              <option value="In_Person">In-Person</option>
            </select>
            <Filter
              size={12}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>

          {/* Reset button if filtered */}
          {(typeFilter !== "All" || searchTerm) && (
            <button
              onClick={handleResetFilters}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Reset Filters"
            >
              <RotateCcw size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Bookings Table Container */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search size={22} />
          </div>
          <h3 className="font-bold text-slate-800 text-base">
            No consultations found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No booking matches the current filter or search criteria. Try modifying your search or resetting filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-primary bg-primary/10 rounded-xl hover:bg-primary/20 transition-colors"
          >
            <RotateCcw size={14} />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto min-w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500  tracking-wider">
                  <th scope="col" className="py-3.5 px-4 sm:px-6">
                    Client
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Service
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Schedule & Type
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Fee
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    Status
                  </th>
                  <th scope="col" className="py-3.5 px-4 text-right sm:pr-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {paginatedBookings.map((booking: any) => {
                  const isExpanded = expandedRowId === booking._id;
                  const isCompleting = completingId === booking._id;
                  const isOnline = booking.serviceType === "Online";
                  const canStartSession = isOnline && isPastOrToday(booking.date);
                  const clientAvatar =
                    booking?.userId?.profileImage ||
                    "https://res.cloudinary.com/dddrm7ep8/image/upload/v1781532954/y7gdxfkl9uznjt96cjea.png";

                  return (
                    <tr
                      key={booking._id}
                      className={`
                        transition-colors group
                        ${isExpanded
                          ? "bg-slate-50/70"
                          : "hover:bg-slate-50/50"
                        }
                      `}
                    >
                      {/* Client Info */}
                      <td className="py-4 px-4 sm:px-6 align-top">
                        <div className="flex items-start gap-3">
                          <div className="relative shrink-0 mt-0.5">
                            <Image
                              src={clientAvatar}
                              alt={booking?.userId?.fullName || "Client"}
                              width={40}
                              height={40}
                              unoptimized
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 bg-slate-100"
                            />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="font-bold text-slate-900 text-sm truncate">
                                {booking?.userId?.fullName || "Private Client"}
                              </p>
                            </div>
                            <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                              {booking?.userId?.email || booking?.userId?.phone || "Client"}
                            </p>
                            {booking?.userId?.location && (
                              <p className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                                <MapPin size={11} className="shrink-0" />
                                <span>{booking.userId.location}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-4 px-4 align-top">
                        <div className="space-y-1">
                          <span className="font-semibold text-slate-800 text-xs block">
                            {booking?.serviceId?.serviceName || "Legal Consultation"}
                          </span>
                          {booking?.serviceDescription && (
                            <p className="text-[11px] text-slate-500 line-clamp-2 max-w-xs leading-relaxed">
                              {booking.serviceDescription}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Schedule & Type */}
                      <td className="py-4 px-4 align-top">
                        <div className="space-y-1.5">
                          {/* Date */}
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                            <Calendar size={13} className="text-slate-400 shrink-0" />
                            <span>
                              {new Date(booking.date).toLocaleDateString("en-GB", {
                                timeZone: "UTC",
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>

                          {/* Time */}
                          <div className="flex items-center gap-1.5 text-xs text-slate-600">
                            <Clock size={13} className="text-slate-400 shrink-0" />
                            <span>{booking.time}</span>
                          </div>

                          {/* Type Badge */}
                          <div>
                            {isOnline ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                <Video size={10} />
                                <span>Online Video</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                                <MapPin size={10} />
                                <span>In-Person</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Fee */}
                      <td className="py-4 px-4 align-top">
                        <div className="inline-flex items-center gap-0.5 font-extrabold text-slate-900 text-sm sm:text-base">
                          <DollarSign size={15} className="text-emerald-600 -mr-0.5" />
                          <span>{booking.fee}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block font-medium">
                          USD
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 align-top">
                        {booking.status === "Active" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                            <span>Active</span>
                          </span>
                        ) : booking.status === "Completed" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                            <CheckCircle2 size={12} className="text-emerald-600" />
                            <span>Completed</span>
                          </span>
                        ) : booking.status === "Cancelled" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/70">
                            <XCircle size={12} className="text-rose-500" />
                            <span>Cancelled</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                            {booking.status}
                          </span>
                        )}

                        {booking.cancelReason && (
                          <p className="text-[11px] text-rose-600 mt-1 line-clamp-1 max-w-[140px]" title={booking.cancelReason}>
                            Reason: {booking.cancelReason}
                          </p>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:pr-6 align-top text-right">
                        <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-1.5">
                          {/* Active actions */}
                          {booking.status === "Active" && (
                            <>
                              {isOnline && (
                                <button
                                  onClick={() => {
                                    if (booking.startUrl) {
                                      window.open(booking.startUrl, "_blank");
                                    } else {
                                      toast.info("Meeting link will be ready before the scheduled time");
                                    }
                                  }}
                                  disabled={!canStartSession}
                                  title={
                                    canStartSession
                                      ? "Launch Video Consultation Meeting"
                                      : "Session unlocks on the appointment date"
                                  }
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs"
                                >
                                  <Video size={13} />
                                  <span>Start</span>
                                </button>
                              )}

                              <button
                                onClick={() => handleMarkCompleted(booking._id)}
                                disabled={isCompleting}
                                title="Mark as Completed & claim consultation fee"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary/90 disabled:opacity-50 transition-all shadow-xs"
                              >
                                {isCompleting ? (
                                  <>
                                    <Loader2 size={13} className="animate-spin" />
                                    <span>Completing...</span>
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 size={13} />
                                    <span>Complete</span>
                                  </>
                                )}
                              </button>

                              <CancelBookingModal
                                id={booking._id}
                                trigger={
                                  <button
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                                    title="Cancel this booking"
                                  >
                                    <XCircle size={13} />
                                    <span>Cancel</span>
                                  </button>
                                }
                              />
                            </>
                          )}

                          {/* Completed actions */}
                          {booking.status === "Completed" && (
                            <CreateReportModal
                              bookingId={booking._id}
                              isReported={booking?.isReported || false}
                              trigger={
                                <button
                                  disabled={booking?.isReported}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                                >
                                  <AlertCircle size={13} />
                                  <span>{booking?.isReported ? "Reported" : "Report"}</span>
                                </button>
                              }
                            />
                          )}

                          {/* Toggle Expand Row for Notes */}
                          <button
                            onClick={() => toggleRowExpand(booking._id)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                            title={isExpanded ? "Collapse details" : "Expand details"}
                          >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>

                        {/* Expandable Info Row */}
                        {isExpanded && (
                          <div className="mt-3 p-3.5 rounded-xl bg-white border border-slate-200 text-left space-y-2 col-span-full shadow-xs">
                            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                <Sparkles size={13} className="text-primary" />
                                Consultation Details
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                ID: {booking._id}
                              </span>
                            </div>

                            {booking.serviceDescription && (
                              <div>
                                <p className="text-[11px] font-semibold text-slate-600">
                                  Client Request & Problem Description:
                                </p>
                                <p className="text-xs text-slate-700 mt-0.5 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                  {booking.serviceDescription}
                                </p>
                              </div>
                            )}

                            {isOnline && booking.startUrl && (
                              <div className="pt-1">
                                <p className="text-[11px] font-semibold text-slate-600 mb-1">
                                  Meeting Host Link:
                                </p>
                                <a
                                  href={booking.startUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline break-all"
                                >
                                  <ExternalLink size={12} />
                                  <span>{booking.startUrl}</span>
                                </a>
                              </div>
                            )}

                            {booking.cancelReason && (
                              <div className="p-2.5 rounded-lg bg-rose-50/80 border border-rose-100 text-rose-700 text-xs">
                                <span className="font-semibold block mb-0.5">Cancellation Reason:</span>
                                <span>{booking.cancelReason}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Pagination */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
            <div>
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {Math.min(
                  (currentPage - 1) * ITEMS_PER_PAGE + 1,
                  filteredBookings.length
                )}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-slate-700">
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredBookings.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {filteredBookings.length}
              </span>{" "}
              consultations
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${isActive
                            ? "bg-primary text-white"
                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerBookings;
