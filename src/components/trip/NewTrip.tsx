'use client';
import { useForm } from 'react-hook-form';
import { createClient } from '../../utils/supabase/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { ROOT_PATH } from '../../constants/routes';
import 'react-datepicker/dist/react-datepicker.css';
import TripInfoFields from '../form/TripInfoFields';

const tripSchema = z.object({
  countryCode: z.string().min(1, '국가를 선택해주세요'),
  title: z.string().min(1, '제목을 입력해주세요'),
  dateRange: z
    .tuple([
      z.date({
        error: (issue) =>
          issue.input === undefined ? '시작일을 선택해주세요' : '올바른 날짜를 선택해주세요',
      }),
      z.date({
        error: (issue) =>
          issue.input === undefined ? '종료일을 선택해주세요' : '올바른 날짜를 선택해주세요',
      }),
    ])
    .refine(([start, end]) => end >= start, {
      message: '종료일은 시작일 이후여야 합니다.',
      path: [1],
    }),
});

export type TripForm = z.infer<typeof tripSchema>;
export default function NewTrip() {
  const { user } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TripForm>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      countryCode: '',
      title: '',
      dateRange: [undefined, undefined],
    },
  });
  const onSubmit = async (data: TripForm) => {
    const supabase = createClient();

    const [startDate, endDate] = data.dateRange;
    const { error } = await supabase.from('trips').insert([
      {
        countryCode: data.countryCode,
        title: data.title,
        start_date: startDate.toISOString().slice(0, 10),
        end_date: endDate.toISOString().slice(0, 10),
        user_id: user?.id,
      },
    ]);
    if (error) {
      alert('저장실패:' + error.message);
    } else {
      alert('여행이 등록되었습니다!');
      router.push(ROOT_PATH);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary-text mb-2">새 여행 추가</h1>
          <p className="text-gray-600 text-sm">여행 정보를 입력해주세요</p>
        </div>

        <form
          className="bg-white rounded-xl shadow-sm p-6 space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TripInfoFields register={register} control={control} errors={errors} />

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
              여행 추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
