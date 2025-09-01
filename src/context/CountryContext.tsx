'use client';
import { createContext, useEffect, useState } from 'react';
import type { Country } from '../type/country';
import type { CountryApiItem } from '../type/country';

export const CountryContext = createContext<Country[]>([]);

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch(
      `https://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey=${process.env.NEXT_PUBLIC_FLAG_API_KEY}&returnType=JSON&numOfRows=999`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('api응답:', data);
        const items = Array.isArray(data?.response.body?.items?.item)
          ? data.response.body.items.item
          : [];
        console.log('s', items);
        const countries: Country[] = items.map((item: CountryApiItem) => ({
          name: item.country_nm,
          flag: item.download_url,
          countryCode: item.country_iso_alp2,
        }));
        setCountries(countries);
      });
  }, []);
  return <CountryContext.Provider value={countries}>{children}</CountryContext.Provider>;
}
