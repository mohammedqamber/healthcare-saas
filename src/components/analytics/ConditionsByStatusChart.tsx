"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartMargin, chartTooltipStyle } from "@/data/analyticsData";

type ConditionStatusData = Array<{
  name: string;
  full: string;
  active: number;
  critical: number;
  recovered: number;
}>;

export function ConditionsByStatusChart({
  data,
}: {
  data: ConditionStatusData;
}) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={chartMargin}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#64748b" />
        <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
        <Tooltip
          contentStyle={chartTooltipStyle}
          labelFormatter={(value) => {
            const item = data.find((entry) => entry.name === value);
            return item?.full || value;
          }}
        />
        <Legend iconType="circle" iconSize={8} />
        <Bar
          dataKey="active"
          stackId="a"
          fill="#22c55e"
          name="Active"
          radius={[0, 0, 4, 4]}
        />
        <Bar dataKey="critical" stackId="a" fill="#ef4444" name="Critical" />
        <Bar
          dataKey="recovered"
          stackId="a"
          fill="#3b82f6"
          name="Recovered"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
