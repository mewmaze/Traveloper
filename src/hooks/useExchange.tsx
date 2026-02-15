import { useState, useEffect } from 'react';
import { getExchangeRate } from '../actions/exchange';

export const useExchange = (tripId?: number) => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [currencyCode, setCurrencyCode] = useState<string | null>(null);

  useEffect(() => {
    if (!tripId) return;

    getExchangeRate(tripId).then(({ exchangeRate, currencyCode }) => {
      setExchangeRate(exchangeRate);
      setCurrencyCode(currencyCode);
    });
  }, [tripId]);

  return { exchangeRate, currencyCode };
};
