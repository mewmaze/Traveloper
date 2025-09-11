'use client';
import * as React from 'react';
import SpendInputForm from '../../../components/form/SpendInputForm';
export default function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  return (
    <div>
      <SpendInputForm tripId={id} />
    </div>
  );
}
