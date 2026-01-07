'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import type { Trip } from '../../type/trip';
import { createClient } from '../../utils/supabase/client';
import { NEW_TRIP_PATH } from '../../constants/routes';
import TripList from '../../components/trip/TripList';
import Image from 'next/image';

export default function TripsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) return;
    const supabase = createClient();

    supabase
      .from('trips')
      .select('*')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (data) setTrips(data);
        setLoading(false);
      });
  }, [user]);
  if (loading) return null;

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
                className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 font-semibold rounded-lg transition shadow-sm"
                onClick={() => router.push(NEW_TRIP_PATH)}
              >
                + 여행 추가
              </button>
            </div>
            <TripList trips={trips} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20">
            <Image src="/firstTrip.svg" alt="First Trip" className="mb-6" />
            <button
              className="bg-primary hover:bg-primary-hover text-white px-6 py-3 font-semibold rounded-lg transition shadow-sm"
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
