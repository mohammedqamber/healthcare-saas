import { cn } from "@/lib/utils";
import { Patient } from "@/types";

export function StatusBadge({ status }: { status: Patient["status"] }) {
  const styles: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Critical: "bg-red-50 text-red-700 border-red-200",
    Inactive: "bg-slate-100 text-slate-700 border-slate-200",
    Recovered: "bg-blue-50 text-blue-700 border-blue-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[status] || styles.Inactive,
      )}
    >
      {status}
    </span>
  );
}
