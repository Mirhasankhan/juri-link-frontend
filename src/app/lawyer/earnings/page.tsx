"use client";

import MonthlyEarnings from "@/components/profile/MonthlyEarnings";
import WeeklyEarnings from "@/components/profile/WeeklyEarnings";
import WithdrawHistory from "@/components/profile/WithdrawHistory";
import WithdrawModal from "@/components/profile/WithdrawModal";
import {
  useEarningsSummaryQuery,
  useWithdrawHistoryQuery,
} from "@/redux/features/earnings/earnings.api";
import {
  TrendingUp,
  CircleDollarSign,
  Loader2,
  Hourglass,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { useState, useMemo } from "react";

export default function LawyerEarningsPage() {
  const [type, setType] = useState<"monthly" | "weekly">("monthly");
  const { data: earningsData, isLoading: isEarningsLoading } =
    useEarningsSummaryQuery(type);
  const { data: withdrawData, isLoading: isWithdrawLoading } =
    useWithdrawHistoryQuery("");

  const allTimeEarnings = earningsData?.data?.allTimeEarnings ?? 0;
  const currentEarningsValue = earningsData?.data?.currentEarnings ?? 0;
  const withdrawHistory: any[] = withdrawData?.data || [];

  // Calculate pending and total disbursed amounts
  const financialMetrics = useMemo(() => {
    const pendingItems = withdrawHistory.filter((i) => i.status === "Pending");
    const acceptedItems = withdrawHistory.filter((i) => i.status === "Accepted");

    const pendingTotal = pendingItems.reduce(
      (sum, item) => sum + (Number(item.amount) || 0),
      0
    );
    const acceptedTotal = acceptedItems.reduce(
      (sum, item) => sum + (Number(item.amount) || 0),
      0
    );

    return {
      pendingTotal,
      pendingCount: pendingItems.length,
      acceptedTotal,
      acceptedCount: acceptedItems.length,
    };
  }, [withdrawHistory]);

  



  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              Earnings & Payouts
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track consultation income, analyze financial trends, and transfer earnings to your bank account
          </p>
        </div>
      </div>

      {/* 4 Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Available Balance */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold  tracking-wider text-slate-400 block">
                Available for Payout
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {isEarningsLoading ? (
                  <Loader2 size={22} className="animate-spin text-primary mt-1" />
                ) : (
                  `$${currentEarningsValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                )}
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <CircleDollarSign size={22} />
            </div>
          </div>

        </div>

        {/* All-Time Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold  tracking-wider text-slate-400 block">
                All-Time Revenue
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {isEarningsLoading ? (
                  <Loader2 size={22} className="animate-spin text-primary mt-1" />
                ) : (
                  `$${allTimeEarnings.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                )}
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <TrendingUp size={22} />
            </div>
          </div>
        </div>

        {/* Pending Payouts */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold  tracking-wider text-slate-400 block">
                Pending Payouts
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {isWithdrawLoading ? (
                  <Loader2 size={22} className="animate-spin text-primary mt-1" />
                ) : (
                  `$${financialMetrics.pendingTotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                )}
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Hourglass size={22} />
            </div>
          </div>
        </div>

        {/* Total Disbursed */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold  tracking-wider text-slate-400 block">
                Total Withdrawn
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {isWithdrawLoading ? (
                  <Loader2 size={22} className="animate-spin text-primary mt-1" />
                ) : (
                  `$${financialMetrics.acceptedTotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                )}
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Building2 size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Performance Chart (Full Width) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Revenue Performance
              </h2>              
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Analyze your consultation revenues and trends across time periods
            </p>
          </div>

          {/* Segmented Period Switcher */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl self-start sm:self-auto border border-slate-200/60">
            <button
              type="button"
              onClick={() => setType("monthly")}
              className={`
                px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all select-none
                ${type === "monthly"
                  ? "bg-white text-primary shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
                }
              `}
            >
              Monthly View
            </button>
            <button
              type="button"
              onClick={() => setType("weekly")}
              className={`
                px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all select-none
                ${type === "weekly"
                  ? "bg-white text-primary shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
                }
              `}
            >
              Weekly View
            </button>
          </div>
        </div>

        {/* Chart Display */}
        <div className="pt-2">
          {type === "monthly" ? (
            <MonthlyEarnings
              chartData={earningsData?.data?.chartData}
              currentEarnings={currentEarningsValue}
            />
          ) : (
            <WeeklyEarnings
              weeklyData={earningsData?.data?.chartData}
              currentEarnings={currentEarningsValue}
            />
          )}
        </div>
      </div>

      {/* Full Payout History Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 leading-tight">
                Payout Transaction History
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Complete audit log of all requested and disbursed bank withdrawals
            </p>
          </div>

          <WithdrawModal
            currentEarnings={currentEarningsValue}
            trigger={
              <button
                disabled={currentEarningsValue <= 0}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary/95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs"
              >
                <ArrowUpRight size={15} />
                <span>Request Payout</span>
              </button>
            }
          />
        </div>

        <WithdrawHistory />
      </div>
    </div>
  );
}
