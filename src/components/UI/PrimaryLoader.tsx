import { Activity } from "lucide-react";
import React from "react";

const PrimaryLoader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex items-center gap-3">
        <Activity className="h-6 w-6 animate-pulse text-primary" />
        <span className="text-lg font-medium">Loading...</span>
      </div>
    </div>
  );
};

export default PrimaryLoader;
