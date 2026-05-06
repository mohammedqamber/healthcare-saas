import { AuthGuard } from "@/components/auth/AuthGuard";
import { SidebarLayout } from "@/components/layout/SidebarLayout";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <SidebarLayout>{children}</SidebarLayout>
    </AuthGuard>
  );
}
