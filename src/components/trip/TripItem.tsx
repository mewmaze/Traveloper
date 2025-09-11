'use client';
import { useRouter } from 'next/navigation';
import { useCountries } from '../../hooks/useCountries';
import type { Trip } from '../../type/trip';
import { EXCHANGE_PATH } from '../../constants/routes';

export default function TripItem({ trip }: { trip: Trip }) {
  const router = useRouter();
  const countries = useCountries();
  const countryInfo = countries.find((c) => c.countryCode === trip.countryCode);
  return (
    <div
      className="bg-white rounded-lg shadow p-4 min-h-[200px] flex flex-col justify-between"
      onClick={() => router.push(`/trips/${trip.id}`)}
    >
      <h3 className="flex justify-between">
        <span>
          {countryInfo && (
            <>
              <img
                src={countryInfo.flag}
                alt={`${countryInfo.name}국기`}
                className="inline w-6 h-4 mr-2 align-middle"
              />
              {countryInfo.name}
            </>
          )}
        </span>
        <button
          className="text-blue-500 hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`${EXCHANGE_PATH}?tripId=${trip.id}`);
          }}
        >
          환전 추가
        </button>
      </h3>
      <div>{trip.title}</div>
      <div>
        {trip.start_date.toString()} - {trip.end_date.toString()}
      </div>
    </div>
  );
}
