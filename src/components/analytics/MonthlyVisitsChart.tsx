"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartMargin, chartTooltipStyle } from "@/data/analyticsData";

interface MonthlyVisitsChartProps {
  data: Array<{ month: string; visits: number; newPatients: number }>;
}

export function MonthlyVisitsChart({ data }: MonthlyVisitsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={chartMargin}>
        <defs>
          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0d9488" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#64748b" />
        <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
        <Tooltip contentStyle={chartTooltipStyle} />
        <Legend iconType="circle" iconSize={8} />
        <Area
          type="monotone"
          dataKey="visits"
          stroke="#0d9488"
          strokeWidth={2}
          fill="url(#colorVisits)"
          name="Total Visits"
        />
        <Area
          type="monotone"
          dataKey="newPatients"
          stroke="#06b6d4"
          strokeWidth={2}
          fill="url(#colorNew)"
          name="New Patients"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
