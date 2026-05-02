"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { usePatientStore } from "@/stores/patientStore";

const COLORS = [
  "#0d9488",
  "#06b6d4",
  "#8b5cf6",
  "#f59e0b",
  "#ec4899",
  "#ef4444",
  "#22c55e",
  "#3b82f6",
];

export default function AnalyticsPage() {
  const { patients } = usePatientStore();

  const ageData = useMemo(() => {
    const groups = [
      { range: "0-18", min: 0, max: 18 },
      { range: "19-35", min: 19, max: 35 },
      { range: "36-50", min: 36, max: 50 },
      { range: "51-65", min: 51, max: 65 },
      { range: "65+", min: 66, max: 200 },
    ];
    return groups.map((g) => ({
      name: g.range,
      patients: patients.filter((p) => p.age >= g.min && p.age <= g.max).length,
    }));
  }, [patients]);

  const statusData = useMemo(() => {
    const counts = { Active: 0, Critical: 0, Inactive: 0, Recovered: 0 };
    patients.forEach((p) => {
      counts[p.status]++;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [patients]);

  const visitsData = useMemo(
    () => [
      { month: "Jan", visits: 120, newPatients: 15 },
      { month: "Feb", visits: 135, newPatients: 18 },
      { month: "Mar", visits: 148, newPatients: 22 },
      { month: "Apr", visits: 162, newPatients: 19 },
      { month: "May", visits: 145, newPatients: 14 },
    ],
    [],
  );

  const genderData = useMemo(() => {
    const counts = { Male: 0, Female: 0, Other: 0 };
    patients.forEach((p) => {
      counts[p.gender]++;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [patients]);

  const conditionData = useMemo(() => {
    const conditions = Array.from(new Set(patients.map((p) => p.condition)));
    return conditions.map((c) => ({
      name: c.length > 12 ? c.slice(0, 12) + "..." : c,
      full: c,
      active: patients.filter((p) => p.condition === c && p.status === "Active")
        .length,
      critical: patients.filter(
        (p) => p.condition === c && p.status === "Critical",
      ).length,
      recovered: patients.filter(
        (p) => p.condition === c && p.status === "Recovered",
      ).length,
    }));
  }, [patients]);

  return (
    <SidebarLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Patient demographics and clinical insights
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold mb-4">
              Patient Age Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={ageData}
                margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  stroke="#64748b"
                />
                <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="patients" fill="#0d9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold mb-4">
              Patient Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={30}
                  iconType="circle"
                  iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 shadow-sm lg:col-span-2">
            <h3 className="text-sm font-semibold mb-4">Monthly Visits Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                data={visitsData}
                margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
              >
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
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  stroke="#64748b"
                />
                <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    fontSize: "12px",
                  }}
                />
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
          </div>

          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold mb-4">Gender Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, value }: any) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {genderData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold mb-4">Conditions by Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={conditionData}
                margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  stroke="#64748b"
                />
                <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    fontSize: "12px",
                  }}
                  labelFormatter={(value: any) => {
                    const item = conditionData.find((d) => d.name === value);
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
                <Bar
                  dataKey="critical"
                  stackId="a"
                  fill="#ef4444"
                  name="Critical"
                />
                <Bar
                  dataKey="recovered"
                  stackId="a"
                  fill="#3b82f6"
                  name="Recovered"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
