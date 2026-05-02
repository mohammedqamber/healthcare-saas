"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Activity, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

export default function LoginPage() {
  const router = useRouter();
  const { login, error, clearError, user, initialized } = useAuthStore();
  const [email, setEmail] = useState("demo@healthcare.com");
  const [password, setPassword] = useState("demo123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (user && initialized) {
      router.push("/dashboard");
    }
  }, [user, initialized, router]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const validate = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch {
      // Error is handled in store
    } finally {
      setLoading(false);
    }
  };

  if (!initialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex items-center gap-3">
          <Activity className="h-6 w-6 animate-pulse text-primary" />
          <span className="text-lg font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  if (user) return null;

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left side - branding */}
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-sidebar-bg p-10 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">MediCore</h1>
            <p className="text-xs text-slate-400">
              Healthcare Management Platform
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold leading-tight">
            Modern healthcare
            <br />
            management system
          </h2>
          <p className="text-slate-400 max-w-md">
            Streamline patient care, monitor analytics, and manage your practice
            efficiently with our comprehensive B2B healthcare platform.
          </p>
        </div>

        <div className="text-sm text-slate-500">
          <p>Trusted by 500+ healthcare providers</p>
        </div>
      </div>

      {/* Right side - login form */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent lg:hidden">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-sm text-muted-foreground">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                    clearError();
                  }}
                  placeholder="doctor@hospital.com"
                  className="w-full rounded-lg border border-input bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
                />
              </div>
              {emailError && (
                <p className="text-xs text-red-500">{emailError}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                    clearError();
                  }}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-input bg-white py-2.5 pl-10 pr-10 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-xs text-red-500">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-(--primary)/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="rounded-lg border border-border bg-accent p-3 text-center">
            <p className="text-xs text-accent-foreground">
              <span className="font-semibold">Demo:</span> demo@healthcare.com /
              demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
