"use client";

import MonthlyEarnings from "@/components/profile/MonthlyEarnings";
import WeeklyEarnings from "@/components/profile/WeeklyEarnings";
import WithdrawHistory from "@/components/profile/WithdrawHistory";
import WithdrawModal from "@/components/profile/WithdrawModal";
import { useEarningsSummaryQuery } from "@/redux/features/earnings/earnings.api";
import { TrendingUp, CircleDollarSign, Loader2 } from "lucide-react";
import { useState } from "react";

export default function LawyerEarningsPage() {
  const [type, setType] = useState("monthly");
  const { data: earningsData, isLoading } = useEarningsSummaryQuery(type);

  const allTimeEarnings = earningsData?.data?.allTimeEarnings ?? 0;
  const currentEarningsValue = earningsData?.data?.currentEarnings ?? 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Earnings Overview Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Available Payout Balance
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              {isLoading ? (
                <Loader2 size={24} className="animate-spin text-primary mt-1" />
              ) : (
                `$${currentEarningsValue.toLocaleString()}`
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Ready for bank withdrawal
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <CircleDollarSign size={28} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              All-Time Revenue
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              {isLoading ? (
                <Loader2 size={24} className="animate-spin text-primary mt-1" />
              ) : (
                `$${allTimeEarnings.toLocaleString()}`
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Total earned since joining JuriLink
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <TrendingUp size={28} />
          </div>
        </div>
      </div>

      {/* Chart and Withdrawal Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Analytics Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Earnings Performance
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Analyze your consultation revenue over time
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Period:</span>
              <select
                className="bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs px-3 py-2 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="monthly">Monthly Breakdown</option>
                <option value="weekly">Weekly Breakdown</option>
              </select>
            </div>
          </div>

          <div>
            {type === "monthly" && (
              <MonthlyEarnings
                chartData={earningsData?.data?.chartData}
                currentEarnings={currentEarningsValue}
              />
            )}
            {type === "weekly" && (
              <WeeklyEarnings
                weeklyData={earningsData?.data?.chartData}
                currentEarnings={currentEarningsValue}
              />
            )}
          </div>
        </div>

        {/* Right Column: Payouts & Withdrawal Requests */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">
              Withdraw Funds
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Transfer your available consultation earnings directly to your verified bank account.
            </p>

            <WithdrawModal currentEarnings={currentEarningsValue} />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
            <h3 className="font-bold text-slate-900 text-base mb-4">
              Payout History
            </h3>
            <WithdrawHistory />
          </div>
        </div>
      </div>
    </div>
  );
}
