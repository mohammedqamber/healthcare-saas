"use client";

import { Grid3X3, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
  viewMode: "grid" | "list";
  onChange: (mode: "grid" | "list") => void;
}

export function ViewToggle({ viewMode, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center rounded-lg border border-input bg-white p-1">
      <button
        onClick={() => onChange("grid")}
        className={cn(
          "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
          viewMode === "grid"
            ? "bg-primary text-white"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Grid3X3 className="h-3.5 w-3.5" />
        Grid
      </button>
      <button
        onClick={() => onChange("list")}
        className={cn(
          "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
          viewMode === "list"
            ? "bg-primary text-white"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <List className="h-3.5 w-3.5" />
        List
      </button>
    </div>
  );
}
