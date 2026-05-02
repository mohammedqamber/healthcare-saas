import { useMemo } from "react";
import { Patient } from "@/types";

interface DashboardStats {
  total: number;
  active: number;
  critical: number;
  todayAppointments: number;
}

export function useDashboardStats(patients: Patient[]): DashboardStats {
  return useMemo(() => {
    const total = patients.length;
    const active = patients.filter((p) => p.status === "Active").length;
    const critical = patients.filter((p) => p.status === "Critical").length;
    const todayAppointments = patients.filter(
      (p) => p.nextAppointment === "2026-05-01",
    ).length;

    return { total, active, critical, todayAppointments };
  }, [patients]);
}

export function useRecentPatients(patients: Patient[], limit = 5): Patient[] {
  return useMemo(() => {
    return [...patients]
      .sort(
        (a, b) =>
          new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime(),
      )
      .slice(0, limit);
  }, [patients, limit]);
}
