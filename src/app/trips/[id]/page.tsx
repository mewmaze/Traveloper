import * as React from 'react';
import SpendInputForm from '../../../components/form/SpendInputForm';
import SpendList from '../../../components/spend/SpendList';
import SpendSummary from '../../../components/spend/SpendSummary';
export default function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  return (
    <div className="flex flex-col min-h-screen">
      <SpendSummary tripId={id} />
      <div className="flex-1 mt-2">
        <SpendList tripId={id} />
      </div>
      <div className="sticky bottom-8">
        <SpendInputForm tripId={id} />
      </div>
    </div>
  );
}
