"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PrimaryLoader from "@/components/UI/PrimaryLoader";
import { useAuthStore } from "@/stores/authStore";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, initialized } = useAuthStore();

  useEffect(() => {
    if (initialized && !user) {
      router.replace("/login");
    }
  }, [initialized, router, user]);

  if (!initialized || !user) {
    return <PrimaryLoader />;
  }

  return children;
}
