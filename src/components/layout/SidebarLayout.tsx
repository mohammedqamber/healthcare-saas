"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Bell,
  LogOut,
  Menu,
  X,
  Activity,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Patients", href: "/patients" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
];

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { notifications, showLocalNotification } = useNotificationStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const timer = setTimeout(() => {
      const { user: u, initialized: i } = useAuthStore.getState();
      if (!u && i) {
        router.push("/login");
      }
      setInitialized(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.warn("SW registration failed:", err));
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const handleDemoNotification = () => {
    showLocalNotification(
      "New Patient Alert",
      "Patient William Brown requires immediate attention - BP critical",
    );
  };

  if (!initialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--background)]">
        <div className="flex items-center gap-3">
          <Activity className="h-6 w-6 animate-pulse text-[var(--primary)]" />
          <span className="text-lg font-medium text-[var(--foreground)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[var(--background)] overflow-hidden">
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[var(--sidebar-bg)] text-[var(--sidebar-fg)] transition-transform md:static md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-3 px-6 py-5 border-b border-[var(--sidebar-border)]">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--sidebar-primary)]">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">MediCore</h1>
            <p className="text-xs text-slate-400">Healthcare Platform</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[var(--sidebar-accent)] text-white"
                    : "text-slate-400 hover:bg-[var(--sidebar-accent)] hover:text-white",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary text-sm font-semibold text-white">
              {user?.displayName?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-sidebar-accent hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-14 items-center justify-between border-b border-border bg-white px-4 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-muted"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="text-sm font-semibold text-muted-foreground">
              {navItems.find((n) => n.href === pathname)?.label || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDemoNotification}
              className="hidden sm:flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-(--primary)/90 transition-colors"
            >
              <Bell className="h-3.5 w-3.5" />
              Test Notification
            </button>

            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Bell className="h-5 w-5 text-muted-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-[var(--border)] bg-white shadow-lg z-50">
                  <div className="flex items-center justify-between p-3 border-b border-[var(--border)]">
                    <h3 className="text-sm font-semibold">Notifications</h3>
                    <button
                      onClick={() => setNotifOpen(false)}
                      className="p-1 rounded hover:bg-[var(--muted)]"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-sm text-[var(--muted-foreground)] text-center">
                        No notifications yet. Click &quot;Test
                        Notification&quot; to see one.
                      </p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={cn(
                            "p-3 border-b border-[var(--border)] last:border-0 cursor-pointer hover:bg-[var(--muted)]",
                            !n.read && "bg-[var(--accent)]",
                          )}
                          onClick={() => {
                            useNotificationStore.getState().markAsRead(n.id);
                          }}
                        >
                          <p className="text-sm font-medium">{n.title}</p>
                          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                            {n.body}
                          </p>
                          <p className="text-[10px] text-[var(--muted-foreground)] mt-1">
                            {new Date(n.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
