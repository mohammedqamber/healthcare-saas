"use client";

import { useMemo } from "react";
import { usePatientStore } from "@/stores/patientStore";
import { AgeDistributionChart } from "@/components/analytics/AgeDistributionChart";
import { ChartCard } from "@/components/analytics/ChartCard";
import { ConditionsByStatusChart } from "@/components/analytics/ConditionsByStatusChart";
import { DistributionPieChart } from "@/components/analytics/DistributionPieChart";
import { MonthlyVisitsChart } from "@/components/analytics/MonthlyVisitsChart";
import {
  getAgeDistribution,
  getConditionStatusData,
  getGenderDistribution,
  getStatusDistribution,
  monthlyVisitsData,
} from "@/data/analyticsData";

export default function AnalyticsPage() {
  const { patients } = usePatientStore();

  const ageData = useMemo(() => getAgeDistribution(patients), [patients]);
  const statusData = useMemo(() => getStatusDistribution(patients), [patients]);
  const genderData = useMemo(() => getGenderDistribution(patients), [patients]);
  const conditionData = useMemo(
    () => getConditionStatusData(patients),
    [patients],
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Patient demographics and clinical insights
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Patient Age Distribution">
          <AgeDistributionChart data={ageData} />
        </ChartCard>

        <ChartCard title="Patient Status Distribution">
          <DistributionPieChart data={statusData} showLegend />
        </ChartCard>

        <ChartCard title="Monthly Visits Trend" className="lg:col-span-2">
          <MonthlyVisitsChart data={monthlyVisitsData} />
        </ChartCard>

        <ChartCard title="Gender Distribution">
          <DistributionPieChart data={genderData} />
        </ChartCard>

        <ChartCard title="Conditions by Status">
          <ConditionsByStatusChart data={conditionData} />
        </ChartCard>
      </div>
    </div>
  );
}
