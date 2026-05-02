"use client";

import { Patient } from "@/types";

function getConditionCounts(patients: Patient[]): Map<string, number> {
  return patients.reduce((acc, patient) => {
    acc.set(patient.condition, (acc.get(patient.condition) || 0) + 1);
    return acc;
  }, new Map<string, number>());
}

interface CommonConditionsProps {
  patients: Patient[];
  limit?: number;
}

export function CommonConditions({
  patients,
  limit = 5,
}: CommonConditionsProps) {
  const conditions = Array.from(getConditionCounts(patients))
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);

  return (
    <div className="rounded-xl border border-border bg-white p-5">
      <h3 className="mb-3 text-sm font-semibold">Common Conditions</h3>
      <div className="space-y-2.5">
        {conditions.map(([condition, count]) => (
          <div
            key={condition}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-foreground">{condition}</span>
            <span className="font-medium text-muted-foreground">
              {count} patients
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
