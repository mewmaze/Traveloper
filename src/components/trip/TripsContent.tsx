'use client';
import { useRouter } from 'next/navigation';
import type { Trip } from '../../type/trip';
import { NEW_TRIP_PATH } from '../../constants/routes';
import TripList from './TripList';
import Image from 'next/image';

export default function TripsContent({ trips }: { trips: Trip[] }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {trips.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-primary-text">내 여행</h1>
                <p className="text-sm text-gray-500 mt-1">{trips.length}개의 여행</p>
              </div>
              <button
                className="bg-primary hover:bg-primary-hover text-primary-text px-6 py-2.5 font-semibold rounded-lg transition shadow-sm"
                onClick={() => router.push(NEW_TRIP_PATH)}
              >
                + 여행 추가
              </button>
            </div>
            <TripList trips={trips} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20">
            <Image
              src="/firstTrip.svg"
              alt="First Trip"
              width={300}
              height={200}
              className="mb-6"
            />
            <button
              className="bg-primary hover:bg-primary-hover text-primary-text px-6 py-3 font-semibold rounded-lg transition shadow-sm"
              onClick={() => router.push(NEW_TRIP_PATH)}
            >
              첫 여행 시작하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
