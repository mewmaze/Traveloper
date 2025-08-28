'use client';
import { Controller, useForm } from 'react-hook-form';
import { createClient } from '../../utils/supabase/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { ROOT_PATH } from '../../constants/routes';
import type { Country } from '../../type/country';
import 'react-datepicker/dist/react-datepicker.css';

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

type TripForm = z.infer<typeof tripSchema>;
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register('country')} className="input">
        <option value="">국가를 선택하세요</option>
        {countries.map((c) => (
          <option key={c.cca2} value={c.name.common}>
            {c.name.common}
          </option>
        ))}
      </select>
      {errors.country && <span className="text-red-500">{errors.country.message}</span>}
      <input {...register('title')} placeholder="여행 제목" />
      {errors.title && <span className="text-red-500">{errors.title.message}</span>}
      <Controller
        name="dateRange"
        control={control}
        render={({ field }) => (
          <DatePicker
            selectsRange
            startDate={field.value?.[0]}
            endDate={field.value?.[1]}
            onChange={field.onChange}
            placeholderText="여행 기간 선택"
            dateFormat="yyyy-MM-dd"
            isClearable
          />
        )}
      />
      {errors.dateRange && (
        <span className="text-red-500">
          {errors.dateRange.message || errors.dateRange[0]?.message || errors.dateRange[1]?.message}
        </span>
      )}
      <button type="submit">여행 추가</button>
    </form>
  );
}
