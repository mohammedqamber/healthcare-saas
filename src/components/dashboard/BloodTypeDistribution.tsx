"use client";

import { Patient } from "@/types";

function getBloodTypeCounts(patients: Patient[]): Map<string, number> {
  return patients.reduce((acc, patient) => {
    acc.set(patient.bloodType, (acc.get(patient.bloodType) || 0) + 1);
    return acc;
  }, new Map<string, number>());
}

interface BloodTypeDistributionProps {
  patients: Patient[];
}

export function BloodTypeDistribution({
  patients,
}: BloodTypeDistributionProps) {
  const bloodTypes = Array.from(getBloodTypeCounts(patients)).sort(
    (a, b) => b[1] - a[1],
  );

  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5">
      <h3 className="mb-3 text-sm font-semibold">Blood Type Distribution</h3>
      <div className="space-y-2.5">
        {bloodTypes.map(([bloodType, count]) => (
          <div
            key={bloodType}
            className="flex items-center justify-between text-sm"
          >
            <span className="inline-flex items-center rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-primary">
              {bloodType}
            </span>
            <span className="font-medium text-muted-foreground">
              {count} patients
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
