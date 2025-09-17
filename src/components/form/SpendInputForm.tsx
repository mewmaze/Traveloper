'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSpendRecourd } from '../../app/trips/[id]/actions';
const spendInputScheme = z.object({
  category: z.string(),
  amount: z.number(),
  payment: z.string(),
  memo: z.string().optional(),
});
export type SpendInputForm = z.infer<typeof spendInputScheme>;
export default function SpendInputForm({ tripId }: { tripId: string }) {
  const {
    register,
    formState: { errors },
  } = useForm<SpendInputForm>({
    resolver: zodResolver(spendInputScheme),
  });
  return (
    <form className="flex bg-gray-50 rounded-md px-3 py-2" action={createSpendRecourd}>
      <input type="hidden" name="trip_id" value={tripId} />
      <input {...register('payment')} placeholder="결제수단" className="flex-1 min-w-0 px-2 py-4" />
      <input
        {...register('amount', { valueAsNumber: true })}
        placeholder="금액"
        className="flex-1 min-w-0 px-2 py-4"
      />
      <input
        {...register('category')}
        placeholder="카테고리"
        className="flex-1 min-w-0 px-2 py-4"
      />
      <input {...register('memo')} placeholder="메모" className="flex-[3] min-w-0 px-2 py-4" />
      <button type="submit" className="px-2 py-1 bg-blue-500 text-white">
        등록
      </button>
    </form>
  );
}
