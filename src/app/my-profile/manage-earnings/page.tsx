"use client";

import MonthlyEarnings from "@/components/profile/MonthlyEarnings";
import Sidebar from "@/components/profile/Sidebar";
import WeeklyEarnings from "@/components/profile/WeeklyEarnings";
import WithdrawHistory from "@/components/profile/WithdrawHistory";
import WithdrawModal from "@/components/profile/WithdrawModal";
import { useEarningsSummaryQuery } from "@/redux/features/earnings/earnings.api";
import Container from "@/utils/Container";
import { useState } from "react";

const EarningsPage = () => {
  const [type, setType] = useState("monthly");
  const { data: earningsData, isLoading } = useEarningsSummaryQuery(type);

  if (isLoading) {
    return "loading...";
  }

  const allTimeEarnings = earningsData?.data?.allTimeEarnings;
  const currentEarningsValue = earningsData?.data?.currentEarnings;

  return (
    <div className="bg-[#f8f8f8]">
      <Container>
        <div className="grid grid-cols-4 gap-6">
          <div className="hidden md:block md:col-span-1 border-r-2">
            <Sidebar></Sidebar>
          </div>
          <div className="md:col-span-3 bg-white p-2">
            <div className="flex gap-8 mb-8">
              <div className="border text-center w-full py-6 rounded-[8px]">
                <h1 className="text-xl font-medium text-gray-500">Current Earnings</h1>
                <h1 className="text-3xl font-medium text-[#FF7F50]">${currentEarningsValue}</h1>
              </div>
              <div className="border text-center w-full py-6 rounded-[8px]">
                <h1 className="text-xl font-medium text-gray-500">All Time Earnings</h1>
                <h1 className="text-3xl font-medium text-[#FF7F50]">${allTimeEarnings}</h1>
              </div>             
            </div>
            <div>
              <div className="flex justify-between items-center pb-4">
                <h1 className="text-2xl font-medium ">Earnings Overview</h1>
                <select
                  className="border bg-[#FF7F50] text-[#FF7F50] bg-opacity-15 outline-none font-bold rounded-[6px] px-5 py-2"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              {type == "monthly" && (
                <MonthlyEarnings
                  chartData={earningsData?.data?.chartData}
                  currentEarnings={currentEarningsValue}
                ></MonthlyEarnings>
              )}
              {type == "weekly" && (
                <WeeklyEarnings
                  weeklyData={earningsData?.data?.chartData}
                  currentEarnings={currentEarningsValue}
                />
              )}
            </div>
            <WithdrawHistory></WithdrawHistory>
            <WithdrawModal currentEarnings={currentEarningsValue}></WithdrawModal>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EarningsPage;
