import { Patient } from "@/types";

export const CHART_COLORS = [
  "#0d9488",
  "#06b6d4",
  "#8b5cf6",
  "#f59e0b",
  "#ec4899",
  "#ef4444",
  "#22c55e",
  "#3b82f6",
];

export const chartTooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "12px",
};

export const chartMargin = { top: 5, right: 5, left: -20, bottom: 0 };

export const monthlyVisitsData = [
  { month: "Jan", visits: 120, newPatients: 15 },
  { month: "Feb", visits: 135, newPatients: 18 },
  { month: "Mar", visits: 148, newPatients: 22 },
  { month: "Apr", visits: 162, newPatients: 19 },
  { month: "May", visits: 145, newPatients: 14 },
];

export function getAgeDistribution(patients: Patient[]) {
  const groups = [
    { name: "0-18", min: 0, max: 18 },
    { name: "19-35", min: 19, max: 35 },
    { name: "36-50", min: 36, max: 50 },
    { name: "51-65", min: 51, max: 65 },
    { name: "65+", min: 66, max: 200 },
  ];

  return groups.map((group) => ({
    name: group.name,
    patients: patients.filter(
      (patient) => patient.age >= group.min && patient.age <= group.max,
    ).length,
  }));
}

export function getStatusDistribution(patients: Patient[]) {
  const counts: Record<Patient["status"], number> = {
    Active: 0,
    Critical: 0,
    Inactive: 0,
    Recovered: 0,
  };

  patients.forEach((patient) => {
    counts[patient.status]++;
  });

  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

export function getGenderDistribution(patients: Patient[]) {
  const counts: Record<Patient["gender"], number> = {
    Male: 0,
    Female: 0,
    Other: 0,
  };

  patients.forEach((patient) => {
    counts[patient.gender]++;
  });

  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

export function getConditionStatusData(patients: Patient[]) {
  const conditions = Array.from(new Set(patients.map((p) => p.condition)));

  return conditions.map((condition) => ({
    name: condition.length > 12 ? `${condition.slice(0, 12)}...` : condition,
    full: condition,
    active: patients.filter(
      (p) => p.condition === condition && p.status === "Active",
    ).length,
    critical: patients.filter(
      (p) => p.condition === condition && p.status === "Critical",
    ).length,
    recovered: patients.filter(
      (p) => p.condition === condition && p.status === "Recovered",
    ).length,
  }));
}
