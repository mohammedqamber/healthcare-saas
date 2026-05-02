"use client";

import { Users, HeartPulse, Activity, Calendar } from "lucide-react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { usePatientStore } from "@/stores/patientStore";

import { StatCard } from "@/components/dashboard/StatCard";
import { PatientRow } from "@/components/dashboard/PatientRow";
import { PatientStatusBreakdown } from "@/components/dashboard/PatientStatusBreakdown";
import { BloodTypeDistribution } from "@/components/dashboard/BloodTypeDistribution";
import { useDashboardStats, useRecentPatients } from "@/hook/useDashboardStats";
import { CommonConditions } from "@/components/dashboard/CommonCondition";

interface StatConfig {
  title: string;
  key: "total" | "active" | "critical" | "todayAppointments";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend?: number;
  trendLabel?: string;
}

const STATS_CONFIG: StatConfig[] = [
  {
    title: "Total Patients",
    key: "total",
    icon: Users,
    trend: 12,
    trendLabel: "vs last month",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Active Patients",
    key: "active",
    icon: HeartPulse,
    trend: 8,
    trendLabel: "vs last month",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Critical Cases",
    key: "critical",
    icon: Activity,
    trend: -5,
    trendLabel: "vs last month",
    color: "bg-red-50 text-red-600",
  },
  {
    title: "Today's Appointments",
    key: "todayAppointments",
    icon: Calendar,
    color: "bg-amber-50 text-amber-600",
  },
];

export default function DashboardPage() {
  const { patients } = usePatientStore();
  const stats = useDashboardStats(patients);
  const recentPatients = useRecentPatients(patients);

  return (
    <SidebarLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Overview of your practice today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS_CONFIG.map(
            ({ title, key, icon, color, trend, trendLabel }) => (
              <StatCard
                key={key}
                title={title}
                value={stats[key]}
                icon={icon}
                trend={trend}
                trendLabel={trendLabel}
                color={color}
              />
            ),
          )}
        </div>

        {/* Recent Patients */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Patients</h2>
            <a
              href="/patients"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all
            </a>
          </div>
          <div className="space-y-2">
            {recentPatients.map((patient) => (
              <PatientRow key={patient.id} patient={patient} />
            ))}
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PatientStatusBreakdown patients={patients} />
          <CommonConditions patients={patients} />
          <BloodTypeDistribution patients={patients} />
        </div>
      </div>
    </SidebarLayout>
  );
}
