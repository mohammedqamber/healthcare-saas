"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartMargin, chartTooltipStyle } from "@/data/analyticsData";

interface AgeDistributionChartProps {
  data: Array<{ name: string; patients: number }>;
}

export function AgeDistributionChart({ data }: AgeDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={chartMargin}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#64748b" />
        <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
        <Tooltip contentStyle={chartTooltipStyle} />
        <Bar dataKey="patients" fill="#0d9488" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
