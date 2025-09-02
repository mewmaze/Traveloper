import { useState, useEffect } from 'react';
import { createClient } from '../utils/supabase/client';
import { countryToCurrency } from '../utils/countryToCurrency';

export const useExchange = (tripId?: number) => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [currencyCode, setCurrencyCode] = useState<string | null>(null);

  useEffect(() => {
    if (!tripId) return;

    const fetchRate = async () => {
      const supabase = createClient();
      const { data: trip } = await supabase
        .from('trips')
        .select('countryCode')
        .eq('id', tripId)
        .maybeSingle();

      if (!trip) return;

      const code = countryToCurrency[trip.countryCode];
      console.log('code:', code);
      setCurrencyCode(code);

      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY}/latest/KRW`,
      );
      const data = await response.json();

      setExchangeRate(data.conversion_rates[code]);
    };

    fetchRate();
  }, [tripId]);

  return { exchangeRate, currencyCode };
};
