import { createClient } from '../../utils/supabase/server';
import type { Trip } from '../../type/trip';
import TripsContent from '../../components/trip/TripsContent';

export default async function TripsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let trips: Trip[] = [];
  if (user) {
    const { data } = await supabase.from('trips').select('*').eq('user_id', user.id);
    if (data) trips = data;
  }

  return <TripsContent trips={trips} />;
}
