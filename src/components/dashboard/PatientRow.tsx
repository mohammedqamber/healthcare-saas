"use client";

import { ArrowUpRight } from "lucide-react";
import { Patient } from "@/types";

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Critical: "bg-red-50 text-red-700",
  Inactive: "bg-slate-100 text-slate-700",
  Recovered: "bg-blue-50 text-blue-700",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export function PatientRow({ patient }: { patient: Patient }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-[var(--border)] bg-white p-4 transition-shadow hover:shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-[var(--primary)]">
        {getInitials(patient.name)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{patient.name}</p>
        <p className="text-xs text-[var(--muted-foreground)]">
          {patient.condition} &bull; {patient.age} yrs
        </p>
      </div>
      <div className="hidden text-right sm:block">
        <p className="text-xs text-[var(--muted-foreground)]">Last Visit</p>
        <p className="text-sm">{patient.lastVisit}</p>
      </div>
      <div className="hidden text-right md:block">
        <p className="text-xs text-[var(--muted-foreground)]">Next Appt</p>
        <p className="text-sm">{patient.nextAppointment}</p>
      </div>
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          STATUS_COLORS[patient.status] ?? "bg-slate-100 text-slate-700"
        }`}
      >
        {patient.status}
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--muted-foreground)]" />
    </div>
  );
}
