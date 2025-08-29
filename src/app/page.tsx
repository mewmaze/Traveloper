'use client';
import { useEffect, useState } from 'react';
import LogoutButton from '../components/auth/LogoutButton';
import { useAuth } from '../hooks/useAuth';
import { TRIPS_PATH } from '../constants/routes';
import { useRouter } from 'next/navigation';
import type { Trip } from '../type/trip';
import { createClient } from '../utils/supabase/client';
import TripList from '../components/trip/TripList';
import { NEW_TRIP_PATH } from '../constants/routes';

export default function Home() {
  const { user } = useAuth();
  const nickname = user?.user_metadata?.nickname;
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
      .then(({ data, error }) => {
        if (data) setTrips(data);
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    if (!user || loading) return;
  }, [user, trips, router]);

  if (!user) {
    return (
      <>
        <p>로그인 해주세요</p>
        <a href="/login">로그인 페이지로 이동</a>
      </>
    );
  }
  return (
    <div className="p-6">
      <div className="flex justify-end mr-8 mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 font-bold rounded-md hover:bg-blue-600 cursor-pointer"
          onClick={() => router.push(NEW_TRIP_PATH)}
        >
          여행 추가
        </button>
      </div>
      {trips.length > 0 ? <TripList trips={trips} /> : <div>여행을 추가해 보세요!</div>}
    </div>
  );
}
