'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '../../utils/supabase/client';
import { useExchange } from '../../hooks/useExchange';
import { useAuth } from '../../hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '../../hooks/useToast';
const exchangeSchema = z.object({
  cashExchange: z.number(),
});
export type ExchangeForm = z.infer<typeof exchangeSchema>;
export default function ExchangeInfoFields() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
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
  const { showToast } = useToast();
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
      showToast('환전 저장에 실패했습니다.', 'error');
    } else {
      router.push(`/trips/${tripId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary-text mb-2">환전 추가</h1>
          <p className="text-gray-600 text-sm">환전한 금액을 입력해주세요</p>
        </div>

        <form
          className="bg-white rounded-xl shadow-sm p-6 space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* 환율 정보 */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-4 border border-amber-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">현재 환율</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-amber-600">
                  {exchangeRate?.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600">{currencyCode}/KRW</span>
              </div>
            </div>
          </div>

          {/* 환전 금액 입력 */}
          <div>
            <input
              {...register('cashExchange', { valueAsNumber: true })}
              type="number"
              placeholder="환전 금액 (원화)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
            {errors.cashExchange && (
              <p className="mt-1.5 text-sm text-red-500">{errors.cashExchange.message}</p>
            )}
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-primary hover:bg-primary-hover text-primary-text font-semibold rounded-lg transition shadow-sm"
            >
              환전 추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
