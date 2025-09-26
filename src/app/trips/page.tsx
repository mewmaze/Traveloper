'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import type { Trip } from '../../type/trip';
import { createClient } from '../../utils/supabase/client';
import { NEW_TRIP_PATH } from '../../constants/routes';
import TripList from '../../components/trip/TripList';

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
      .then(({ data, error }) => {
        if (data) setTrips(data);
        setLoading(false);
      });
  }, [user]);
  if (loading) return null;

  return (
    <div>
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
