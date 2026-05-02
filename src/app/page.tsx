'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Activity } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { user, initialized } = useAuthStore();

  useEffect(() => {
    if (initialized) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [user, initialized, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex items-center gap-3">
        <Activity className="h-6 w-6 animate-pulse text-primary" />
        <span className="text-lg font-medium">Loading...</span>
      </div>
    </div>
  );
}
