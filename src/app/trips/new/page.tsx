'use client';
import NewTrip from '../../../components/trip/NewTrip';
import { useCountries } from '../../../hooks/useCountries';

export default function NewTripPage() {
  const countries = useCountries();
  return <NewTrip countries={countries} />;
}
