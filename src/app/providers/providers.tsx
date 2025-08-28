'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { AuthProvider } from '../../context/AuthContext';
import { CountryProvider } from '../../context/CountryContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <CountryProvider>{children}</CountryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
