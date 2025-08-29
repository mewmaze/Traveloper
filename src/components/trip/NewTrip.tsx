'use client';
import { useForm } from 'react-hook-form';
import { createClient } from '../../utils/supabase/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { ROOT_PATH } from '../../constants/routes';
import type { Country } from '../../type/country';
import 'react-datepicker/dist/react-datepicker.css';
import TripInfoFields from '../form/TriipInfoFields';

const tripSchema = z.object({
  country: z.string().min(1, '국가를 선택해주세요'),
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
export default function NewTrip({ countries }: { countries: Country[] }) {
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
      country: '',
      title: '',
      dateRange: [undefined, undefined],
    },
  });
  const onSubmit = async (data: TripForm) => {
    const supabase = createClient();

    const [startDate, endDate] = data.dateRange;
    const { error } = await supabase.from('trips').insert([
      {
        country: data.country,
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
    <form
      className="flex flex-col gap-8 p-6 bg-white rounded-lg shadow w-full max-w-lg mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TripInfoFields register={register} control={control} errors={errors} countries={countries} />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 font-bold rounded-md hover:bg-blue-600 cursor-pointer"
      >
        여행 추가
      </button>
    </form>
  );
}
