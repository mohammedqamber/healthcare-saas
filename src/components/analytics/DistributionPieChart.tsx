"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CHART_COLORS, chartTooltipStyle } from "@/data/analyticsData";

type PieData = Array<{ name: string; value: number }>;

function renderPieLabel({ name, value }: { name: string; value: number }) {
  return `${name}: ${value}`;
}

export function DistributionPieChart({
  data,
  showLegend = false,
}: {
  data: PieData;
  showLegend?: boolean;
}) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={showLegend ? 60 : 0}
          outerRadius={90}
          paddingAngle={showLegend ? 4 : 0}
          dataKey="value"
          label={showLegend ? undefined : renderPieLabel}
          labelLine={false}
        >
          {data.map((item, index) => (
            <Cell
              key={item.name}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip contentStyle={chartTooltipStyle} />
        {showLegend && (
          <Legend
            verticalAlign="bottom"
            height={30}
            iconType="circle"
            iconSize={8}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}
