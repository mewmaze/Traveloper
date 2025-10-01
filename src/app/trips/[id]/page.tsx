import * as React from 'react';
import SpendInputForm from '../../../components/form/SpendInputForm';
import SpendList from '../../../components/spend/SpendList';
import SpendSummary from '../../../components/spend/SpendSummary';
import SpendActions from '../../../components/spend/SpendActions';
import { getSpendByTrip } from '../../../actions/spends';

interface TripDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ day?: string }>;
}

export default async function TripDetailPage({ params, searchParams }: TripDetailPageProps) {
  const { id } = await params;
  const { day = 'all' } = await searchParams;
  const data = await getSpendByTrip(id);

  if (!data.success || !data.tripInfo) {
    return <div>지출 내역을 불러올 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between items-center p-2 border-b">
        <SpendSummary tripId={id} />
        <SpendActions tripId={id} />
      </div>
      <div className="flex-1 mt-2">
        <SpendList tripId={id} data={data} selectedDay={day} />
      </div>
      <div className="sticky bottom-8">
        <SpendInputForm tripId={id} />
      </div>
    </div>
  );
}
