import { Control, Controller, UseFormRegister } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import type { TripForm } from '../trip/NewTrip';
import { FieldErrors } from 'react-hook-form';
import { Country } from '../../type/country';
import { useCountries } from '../../hooks/useCountries';

export default function TripInfoFields({
  register,
  control,
  errors,
}: {
  register: UseFormRegister<TripForm>;
  control: Control<TripForm>;
  errors: FieldErrors<TripForm>;
}) {
  const countries: Country[] = useCountries();
  return (
    <div className="space-y-5">
      {/* 국가 선택 */}
      <div>
        <select
          {...register('countryCode')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
        >
          <option value="">국가를 선택하세요</option>
          {countries.map((c) => (
            <option key={c.name} value={c.countryCode}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.countryCode && (
          <p className="mt-1.5 text-sm text-red-500">{errors.countryCode.message}</p>
        )}
      </div>

      {/* 여행 제목 */}
      <div>
        <input
          {...register('title')}
          placeholder="예: 도쿄 여행"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
        />
        {errors.title && <p className="mt-1.5 text-sm text-red-500">{errors.title.message}</p>}
      </div>

      {/* 여행 기간 */}
      <div>
        <Controller
          name="dateRange"
          control={control}
          render={({ field }) => (
            <DatePicker
              selectsRange
              startDate={field.value?.[0]}
              endDate={field.value?.[1]}
              onChange={field.onChange}
              placeholderText="시작일 - 종료일"
              dateFormat="yyyy-MM-dd"
              isClearable
              popperPlacement="bottom-start"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          )}
        />
        {errors.dateRange && (
          <p className="mt-1.5 text-sm text-red-500">
            {errors.dateRange.message ||
              errors.dateRange[0]?.message ||
              errors.dateRange[1]?.message}
          </p>
        )}
      </div>
    </div>
  );
}
