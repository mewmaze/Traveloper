'use client';
import { createContext, useEffect, useState } from 'react';
import type { Country } from '../type/country';

export const CountryContext = createContext<Country[]>([]);

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,cca2,flags')
      .then((res) => res.json())
      .then((data) => {
        (data as Country[]).sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(data as Country[]);
      });
  }, []);

  return <CountryContext.Provider value={countries}>{children}</CountryContext.Provider>;
}
