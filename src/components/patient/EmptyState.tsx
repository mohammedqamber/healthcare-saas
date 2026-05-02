"use client";

import { Search } from "lucide-react";

interface EmptyStateProps {
  onClear: () => void;
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-white py-16">
      <Search className="h-10 w-10 text-[var(--muted-foreground)] mb-3" />
      <p className="text-sm font-medium text-[var(--muted-foreground)]">
        No patients match your search
      </p>
      <button
        onClick={onClear}
        className="mt-2 text-sm text-[var(--primary)] hover:underline"
      >
        Clear filters
      </button>
    </div>
  );
}
