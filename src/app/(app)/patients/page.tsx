"use client";

import { useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import { usePatientStore } from "@/stores/patientStore";
import { PatientCard } from "@/components/patient/PatientCard";
import { PatientListRow } from "@/components/patient/PatientListRow";
import { ViewToggle } from "@/components/patient/ViewToggle";
import { EmptyState } from "@/components/patient/EmptyState";

const statusOptions = ["All", "Active", "Critical", "Inactive", "Recovered"];

export default function PatientsPage() {
  const {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    getFilteredPatients,
  } = usePatientStore();

  const filtered = useMemo(() => getFilteredPatients(), [getFilteredPatients]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filtered.length} patient{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, or condition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-input bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none rounded-lg border border-input bg-white py-2.5 pl-4 pr-10 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring transition-colors cursor-pointer"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All Statuses" : s}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-muted-foreground" />
        </div>

        {/* View Toggle */}
        <ViewToggle viewMode={viewMode} onChange={setViewMode} />
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <EmptyState onClear={handleClearFilters} />
      ) : viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((patient) => (
            <PatientListRow key={patient.id} patient={patient} />
          ))}
        </div>
      )}
    </div>
  );
}
