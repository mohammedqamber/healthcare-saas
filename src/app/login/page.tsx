import { GuestGuard } from "@/components/auth/GuestGuard";
import LoginPage from "@/components/auth/LoginPage";

export default function LoginRoute() {
  return (
    <GuestGuard>
      <LoginPage />
    </GuestGuard>
  );
}
