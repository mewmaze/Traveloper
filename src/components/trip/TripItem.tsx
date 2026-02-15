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
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100 overflow-hidden"
      onClick={() => router.push(`/trips/${trip.id}`)}
    >
      {/* 상단 헤더 영역 */}
      <div className="bg-gradient-to-r from-primary-light to-primary p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {countryInfo && (
              <>
                <img
                  src={countryInfo.flag}
                  alt={`${countryInfo.name} 국기`}
                  className="w-8 h-6 rounded shadow-sm object-cover"
                />
                <span className="text-primary-text font-semibold">{countryInfo.name}</span>
              </>
            )}
          </div>
          <button
            className="text-xs bg-white px-3 py-1.5 rounded-full text-primary-text font-medium hover:bg-gray-50 transition"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`${EXCHANGE_PATH}?tripId=${trip.id}`);
            }}
          >
            환전 추가
          </button>
        </div>
      </div>

      {/* 본문 영역 */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{trip.title}</h3>
        <div className="text-sm text-gray-500">
          {new Date(trip.start_date).toLocaleDateString('ko-KR', {
            month: 'long',
            day: 'numeric',
          })}{' '}
          -{' '}
          {new Date(trip.end_date).toLocaleDateString('ko-KR', {
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
    </div>
  );
}
