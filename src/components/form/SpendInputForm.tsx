'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { createSpendRecourd } from '../../app/trips/[id]/actions';
import { ArrowUp } from 'lucide-react';

const spendInputScheme = z.object({
  category: z.string(),
  amount: z.number(),
  expense_method: z.string(),
  memo: z.string().optional(),
});
export type SpendInputForm = z.infer<typeof spendInputScheme>;
export default function SpendInputForm({ tripId }: { tripId: string }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SpendInputForm>({
    resolver: zodResolver(spendInputScheme),
  });

  const onSubmit = async (data: SpendInputForm) => {
    const result = await createSpendRecourd({ ...data, trip_id: tripId });
    if (result.success) {
      router.refresh(); // SpendList 즉시 갱신
      reset();
    } else {
      alert('등록 실패: ' + result.error);
    }
  };

  return (
    <form className="bg-white border-t border-gray-200" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center px-1 py-2">
        <input type="hidden" name="trip_id" value={tripId} />

        <select
          {...register('expense_method')}
          className="flex-1 min-w-0 px-2 py-1.5 text-xs text-gray-600 bg-transparent border-0 focus:outline-none"
        >
          <option value="">결제</option>
          <option value="cash">현금</option>
          <option value="card">카드</option>
        </select>

        <input
          {...register('amount', { valueAsNumber: true })}
          type="number"
          placeholder="금액"
          className="flex-[1.5] min-w-0 px-2 py-1.5 text-xs text-right text-gray-600 placeholder:text-gray-400 bg-transparent border-0 focus:outline-none"
        />

        <select
          {...register('category')}
          className="flex-1 min-w-0 px-2 py-1.5 text-xs text-center text-gray-600 bg-transparent border-0 focus:outline-none"
        >
          <option value="">유형</option>
          <option value="식사">식사</option>
          <option value="쇼핑">쇼핑</option>
          <option value="교통">교통</option>
          <option value="기타">기타</option>
        </select>

        <input
          {...register('memo')}
          placeholder="메모"
          className="flex-[2.5] min-w-0 px-2 py-1.5 text-xs text-gray-600 placeholder:text-gray-400 bg-transparent border-0 focus:outline-none"
        />

        <button
          type="submit"
          className="p-2 bg-primary hover:bg-primary-hover rounded-full transition ml-2"
        >
          <ArrowUp size={16} color="white" strokeWidth={2.5} />
        </button>
      </div>
    </form>
  );
}
