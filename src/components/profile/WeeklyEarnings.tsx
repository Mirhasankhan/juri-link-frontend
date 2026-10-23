"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScriptableContext,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface WeeklyEarningsProps {
  weeklyData?: Array<{ day: string; earnings: number }>;
  currentEarnings?: number;
}

const WeeklyEarnings = ({
  weeklyData = [],
  currentEarnings = 0,
}: WeeklyEarningsProps) => {
  const days = weeklyData?.map((item) => item.day) || [];
  const values = weeklyData?.map((item) => item.earnings) || [];

  const maxVal = Math.max(...values, 0);

  const data = {
    labels: days,
    datasets: [
      {
        data: values,
        borderColor: "#2e7999",
        borderWidth: 2.5,
        tension: 0.38,
        fill: true,
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 320);
          gradient.addColorStop(0, "rgba(46, 121, 153, 0.22)");
          gradient.addColorStop(0.65, "rgba(46, 121, 153, 0.05)");
          gradient.addColorStop(1, "rgba(46, 121, 153, 0.0)");
          return gradient;
        },
        pointRadius: (context: any) => {
          const val = context.dataset.data[context.dataIndex];
          return val === maxVal && val > 0 ? 5 : 3.5;
        },
        pointHoverRadius: 6,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#2e7999",
        pointBorderWidth: 2,
        pointHoverBorderColor: "#2e7999",
        pointHoverBackgroundColor: "#2e7999",
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#0f172a",
        titleColor: "#94a3b8",
        titleFont: { size: 11, weight: "500" },
        bodyColor: "#ffffff",
        bodyFont: { size: 13, weight: "700" },
        padding: { top: 8, bottom: 8, left: 12, right: 12 },
        cornerRadius: 10,
        displayColors: false,
        callbacks: {
          title: (items: any) => {
            return items[0]?.label || "";
          },
          label: (context: any) => {
            return `Daily Revenue: $${Number(context.raw || 0).toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#64748b",
          font: { size: 11, weight: "500" },
          padding: 8,
        },
        border: { display: false },
      },
      y: {
        grid: {
          color: "rgba(226, 232, 240, 0.7)",
        },
        ticks: {
          color: "#94a3b8",
          font: { size: 11 },
          padding: 8,
          callback: (value: any) => `$${value.toLocaleString()}`,
        },
        border: { display: false },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full">
      <div className="h-[320px] sm:h-[350px] w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default WeeklyEarnings;
