import { useContext } from 'react';
import { CountryContext } from '../context/CountryContext';

export function useCountries() {
  const ctx = useContext(CountryContext);
  if (ctx === undefined) {
    throw new Error('useCountries must be used within a CountryProvider');
  }
  return ctx;
}
