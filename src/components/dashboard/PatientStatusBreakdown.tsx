"use client";

import { Patient } from "@/types";

const STATUSES = ["Active", "Critical", "Recovered", "Inactive"] as const;

interface PatientStatusBreakdownProps {
  patients: Patient[];
}

export function PatientStatusBreakdown({
  patients,
}: PatientStatusBreakdownProps) {
  const total = patients.length || 1;

  const counts = STATUSES.map((status) => ({
    status,
    count: patients.filter((p) => p.status === status).length,
  }));

  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5">
      <h3 className="mb-3 text-sm font-semibold">Patient Status Breakdown</h3>
      <div className="space-y-2.5">
        {counts.map(({ status, count }) => (
          <div key={status} className="flex items-center gap-3">
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span>{status}</span>
                <span className="font-medium">{count}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[var(--muted)]">
                <div
                  className="h-full rounded-full bg-[var(--primary)] transition-all"
                  style={{ width: `${(count / total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
