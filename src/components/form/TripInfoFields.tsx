import { Control, Controller, UseFormRegister } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import type { TripForm } from '../trip/NewTrip';
import { FieldErrors } from 'react-hook-form';
import { Country } from '../../type/country';

export default function TripInfoFields({
  register,
  countries,
  control,
  errors,
}: {
  register: UseFormRegister<TripForm>;
  control: Control<TripForm>;
  errors: FieldErrors<TripForm>;
  countries: Country[];
}) {
  return (
    <>
      <select {...register('countryCode')} className="input">
        <option value="">국가를 선택하세요</option>
        {countries.map((c) => (
          <option key={c.name} value={c.countryCode}>
            {c.name}
          </option>
        ))}
      </select>
      {errors.countryCode && <span className="text-red-500">{errors.countryCode.message}</span>}
      <input {...register('title')} placeholder="여행 제목" className="input" />
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
            popperPlacement="bottom-start"
            className="input"
          />
        )}
      />
      {errors.dateRange && (
        <span className="text-red-500">
          {errors.dateRange.message || errors.dateRange[0]?.message || errors.dateRange[1]?.message}
        </span>
      )}
    </>
  );
}
