'use client';
import { useCountries } from '../../hooks/useCountries';
import type { Trip } from '../../type/trip';

export default function TripItem({ trip }: { trip: Trip }) {
  const countries = useCountries();
  const countryInfo = countries.find((c) => c.countryCode === trip.countryCode);
  return (
    <div className="bg-white rounded-lg shadow p-4 min-h-[200px] flex flex-col justify-between">
      <h3>
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
      </h3>
      <div>{trip.title}</div>
      <div>
        {trip.start_date.toString()} - {trip.end_date.toString()}
      </div>
    </div>
  );
}
