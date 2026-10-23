"use client";

import { useWithdrawHistoryQuery } from "@/redux/features/earnings/earnings.api";
import {
  CheckCircle2,
  Hourglass,
  XCircle,
  Building2,
  Receipt,
  ArrowDownLeft,
} from "lucide-react";
import { useMemo } from "react";

const WithdrawHistory = () => {
  const { data, isLoading } = useWithdrawHistoryQuery("");

  const withdraws: any[] = useMemo(() => data?.data || [], [data?.data]);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-6 w-36 bg-slate-200 animate-pulse rounded-lg" />
        <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 overflow-hidden bg-white">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-200 animate-pulse" />
                <div className="space-y-1.5">
                  <div className="h-4 w-24 bg-slate-200 animate-pulse rounded" />
                  <div className="h-3 w-32 bg-slate-100 animate-pulse rounded" />
                </div>
              </div>
              <div className="h-6 w-20 bg-slate-200 animate-pulse rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (withdraws.length === 0) {
    return (
      <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 space-y-2">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <Receipt size={22} />
        </div>
        <h4 className="text-sm font-bold text-slate-800">
          No Withdrawal Records Yet
        </h4>
        <p className="text-xs text-slate-500 max-w-xs mx-auto">
          Your requested bank payouts and completed withdrawals will appear here as you request funds.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Transaction List / Table */}
      <div className="rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-xs">
        <div className="overflow-x-auto min-w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500  tracking-wider">
                <th scope="col" className="py-3 px-4 sm:px-6">
                  Transaction
                </th>
                <th scope="col" className="py-3 px-4">
                  Amount
                </th>
                <th scope="col" className="py-3 px-4">
                  Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Destination
                </th>
                <th scope="col" className="py-3 px-4 sm:pr-6 text-right">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {withdraws.map((item: any) => {
                const isPending = item.status === "Pending";
                const isAccepted = item.status === "Accepted";             
                const shortId = item._id ? `#${item._id.slice(-6).toUpperCase()}` : "#PAYOUT";

                return (
                  <tr key={item._id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Transaction Reference */}
                    <td className="py-3.5 px-4 sm:px-6 align-middle">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isAccepted
                              ? "bg-emerald-50 text-emerald-600"
                              : isPending
                                ? "bg-amber-50 text-amber-600"
                                : "bg-rose-50 text-rose-600"
                            }`}
                        >
                          <ArrowDownLeft size={16} />
                        </div>
                        <div>
                          <span className="font-mono text-xs font-bold text-slate-800">
                            {shortId}
                          </span>
                          <span className="text-[11px] text-slate-400 block font-medium">
                            Bank Payout
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 align-middle">
                      <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                        ${Number(item.amount || 0).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 align-middle">
                      {isPending ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/70">
                          <Hourglass size={12} className="animate-spin text-amber-600" />
                          <span>Pending Review</span>
                        </span>
                      ) : isAccepted ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                          <CheckCircle2 size={12} className="text-emerald-600" />
                          <span>Disbursed</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/70">
                          <XCircle size={12} className="text-rose-600" />
                          <span>Rejected</span>
                        </span>
                      )}
                    </td>

                    {/* Destination */}
                    <td className="py-3.5 px-4 align-middle">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                        <Building2 size={13} className="text-slate-400 shrink-0" />
                        <span>Stripe Direct</span>
                      </div>
                    </td>

                    {/* Timestamp */}
                    <td className="py-3.5 px-4 sm:pr-6 align-middle text-right">
                      <div className="space-y-0.5">
                        <p className="text-xs font-medium text-slate-700">
                          {new Date(item.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {new Date(item.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WithdrawHistory;
