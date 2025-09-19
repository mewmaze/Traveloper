'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { AuthProvider } from '../../context/AuthContext';
import { CountryProvider } from '../../context/CountryContext';
import type { Country } from '../../type/country';

export function Providers({ children, countries }: { children: ReactNode; countries: Country[] }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <CountryProvider initialCountries={countries}>{children}</CountryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
