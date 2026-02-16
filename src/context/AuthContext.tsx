'use client';
import { createContext, useEffect, useState } from 'react';
import type { AuthContextType } from '../type/auth';
import type { User } from '@supabase/supabase-js';
import { createClient } from '../utils/supabase/client';
import { useRouter } from 'next/navigation';
import { ROOT_PATH } from '../constants/routes';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'TOKEN_REFRESHED' && !session) {
        router.push(ROOT_PATH);
      }
      if (event === 'SIGNED_OUT') {
        router.push(ROOT_PATH);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>;
}
