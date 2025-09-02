'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '../../utils/supabase/client';
import { useEffect, useState } from 'react';
import { useExchange } from '../../hooks/useExchange';
import { useAuth } from '../../hooks/useAuth';
const exchangeSchema = z.object({
  cashExchange: z.number(),
});
export type ExchangeForm = z.infer<typeof exchangeSchema>;
export default function ExchangeInfoFields() {
  const { user } = useAuth();
  const searchParams = new URLSearchParams(window.location.search);
  const tripIdParam = searchParams.get('tripId');
  const tripId = tripIdParam ? Number(tripIdParam) : null;
  const { exchangeRate, currencyCode } = useExchange(tripId ?? undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExchangeForm>({
    resolver: zodResolver(exchangeSchema),
  });
  const onSubmit = async (data: ExchangeForm) => {
    const supabase = createClient();
    const { error } = await supabase.from('exchange_records').insert([
      {
        trip_id: tripId,
        amount: data.cashExchange,
        currency_code: currencyCode,
        exchange_rate: exchangeRate,
        user_id: user?.id,
      },
    ]);
    if (error) {
      alert('환전 저장실패:' + error.message);
    } else {
      alert('환전 저장 성공!');
    }
  };

  return (
    <form
      className="flex flex-col gap-8 p-6 bg-white rounded-lg shadow w-full max-w-lg mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register('cashExchange', { valueAsNumber: true })}
        placeholder="환전 금액"
        className="input"
      />
      {`환율: ${exchangeRate} `}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 font-bold rounded-md hover:bg-blue-600 cursor-pointer"
      >
        환전 추가
      </button>
    </form>
  );
}
