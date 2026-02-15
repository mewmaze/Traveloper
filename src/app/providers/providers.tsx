'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { AuthProvider } from '../../context/AuthContext';
import { CountryProvider } from '../../context/CountryContext';
import { ToastProvider } from '../../context/ToastContext';
import type { Country } from '../../type/country';

export function Providers({ children, countries }: { children: ReactNode; countries: Country[] }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <ToastProvider>
          <CountryProvider initialCountries={countries}>{children}</CountryProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
