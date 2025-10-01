'use client';
import { useRouter } from 'next/navigation';
import { EXCHANGE_PATH } from '../../constants/routes';
import { STATISTICS_PATH } from '../../constants/routes';

interface SpendActionsProps {
  tripId: string;
}
export default function SpendActions({ tripId }: SpendActionsProps) {
  const router = useRouter();
  return (
    <div className="flex gap-4">
      <button onClick={() => router.push(`${EXCHANGE_PATH}?tripId=${tripId}`)}>
        <img src="/coin.png" alt="환전" className="w-8 h-8" />
      </button>
      <button onClick={() => router.push(`${STATISTICS_PATH}?tripId=${tripId}`)}>
        <img src="/chart.png" alt="통계" className="w-8 h-8" />
      </button>
    </div>
  );
}
