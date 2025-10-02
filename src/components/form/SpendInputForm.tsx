'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { createSpendRecourd } from '../../app/trips/[id]/actions';
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
    <form className="bg-white border-t shadow-lg" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center px-5 py-3 gap-0">
        <input type="hidden" name="trip_id" value={tripId} />

        <select
          {...register('expense_method')}
          className="flex-1 px-3 py-2 border-0 bg-transparent text-sm focus:outline-none focus:ring-0"
        >
          <option value="">결제</option>
          <option value="cash">현금</option>
          <option value="card">카드</option>
        </select>

        <input
          {...register('amount', { valueAsNumber: true })}
          placeholder="금액"
          className="flex-[1.5] px-3 py-2 border-0 bg-transparent text-sm text-right focus:outline-none focus:ring-0"
        />

        <select
          {...register('category')}
          className="flex-1 px-3 py-2 border-0 bg-transparent text-sm text-center focus:outline-none focus:ring-0"
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
          className="flex-[2.5] px-3 py-2 border-0 bg-transparent text-sm focus:outline-none focus:ring-0"
        />

        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition"
        >
          등록
        </button>
      </div>
    </form>
  );
}
