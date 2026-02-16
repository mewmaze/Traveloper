'use server';
import { createClient } from '../utils/supabase/server';
import countryToCurrency from 'country-to-currency';

export async function getCurrencyCode(tripId: number): Promise<string | null> {
  const supabase = await createClient();
  const { data: trip } = await supabase
    .from('trips')
    .select('countryCode')
    .eq('id', tripId)
    .maybeSingle();

  if (!trip) return null;

  return (countryToCurrency as Record<string, string>)[trip.countryCode] ?? null;
}

export async function getExchangeRate(tripId: number) {
  const supabase = await createClient();
  const { data: trip } = await supabase
    .from('trips')
    .select('countryCode')
    .eq('id', tripId)
    .maybeSingle();

  if (!trip) return { exchangeRate: null, currencyCode: null };

  const currencyCode = (countryToCurrency as Record<string, string>)[trip.countryCode];

  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${currencyCode}`,
  );
  const data = await response.json();

  return {
    exchangeRate: data.conversion_rates?.['KRW'] ?? null,
    currencyCode,
  };
}
