'use client';
import { useRouter } from 'next/navigation';
import { EXCHANGE_PATH } from '../../constants/routes';
import { STATISTICS_PATH } from '../../constants/routes';
import Image from 'next/image';

interface SpendActionsProps {
  tripId: string;
}
export default function SpendActions({ tripId }: SpendActionsProps) {
  const router = useRouter();
  return (
    <div className="flex gap-0 sm:gap-2">
      <button
        className="group relative p-2 hover:bg-gray-100 rounded-lg transition"
        onClick={() => router.push(`${EXCHANGE_PATH}?tripId=${tripId}`)}
      >
        <Image src="/coin.png" alt="환전" width={32} height={32} className="w-8 h-8" />
        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-1 py-1 bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg z-50">
          환전 추가
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-b-gray-700"></span>
        </span>
      </button>
      <button
        className="group relative p-2 hover:bg-gray-100 rounded-lg transition"
        onClick={() => router.push(`${STATISTICS_PATH}?tripId=${tripId}`)}
      >
        <Image src="/chart.png" alt="통계" width={32} height={32} className="w-8 h-8" />

        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-1 py-1 bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg z-50">
          통계
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-b-gray-700"></span>
        </span>
      </button>
    </div>
  );
}
