import { NEW_TRIP_PATH } from '../../constants/routes';
import type { Trip } from '../../type/trip';
import TripItem from './TripItem';

export default function TripList({ trips }: { trips: Trip[] }) {
  return (
    <div className="p-6 sm:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}
