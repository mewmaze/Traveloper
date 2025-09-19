'use client';
import { createContext, useEffect, useState } from 'react';
import type { Country } from '../type/country';
import type { CountryApiItem } from '../type/country';

export const CountryContext = createContext<Country[]>([]);

export function CountryProvider({
  children,
  initialCountries = [],
}: {
  children: React.ReactNode;
  initialCountries: Country[];
}) {
  const [countries, setCountries] = useState<Country[]>(initialCountries);

  return <CountryContext.Provider value={countries}>{children}</CountryContext.Provider>;
}
