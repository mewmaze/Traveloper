'use client';

import SpendItem from './SpendItem';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SpendTabs from './SpendTabs';
import type { SpendRecord } from '../../type/spend';

interface SpendListProps {
  tripId: string;
  data: {
    success: boolean;
    spends: SpendRecord[];
    spendsByDay: Record<number, SpendRecord[]>;
    dailyTotals: Record<number, number>;
    tripInfo: {
      totalDays: number;
      start_date: string;
      end_date: string;
    };
  };
  selectedDay: string;
  currencyCode: string;
}
export default function SpendList({ tripId, data, selectedDay, currencyCode }: SpendListProps) {
  const router = useRouter();
  const [currentDay, setCurrentDay] = useState(selectedDay);

  const handleDayChange = (day: string) => {
    setCurrentDay(day);
    const url = day === 'all' ? `/trips/${tripId}` : `/trips/${tripId}?day=${day}`;
    router.push(url);
  };
  const getCurrentSpends = () => {
    if (currentDay === 'all') {
      return data.spends;
    }
    const dayNumber = parseInt(currentDay);
    return data.spendsByDay[dayNumber] || [];
  };

  const currentSpends = getCurrentSpends();
  return (
    <div className="flex flex-col h-full pt-2">
      <SpendTabs
        currentDay={currentDay}
        totalDays={data.tripInfo.totalDays}
        spendsByDay={data.spendsByDay}
        onDayChange={handleDayChange}
      />
      <div className="flex px-5 py-2 items-center text-xs text-gray-500 font-medium border-b border-gray-200 pr-[calc(1.25rem+15px)]">
        <div className="flex-1 px-3">결제</div>
        <div className="flex-[1.5] px-3 text-right">금액({currencyCode})</div>
        <div className="flex-1 px-3 text-center">유형</div>
        <div className="flex-[2.5] px-3">메모</div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {currentSpends?.map((spend: SpendRecord) => (
          <SpendItem key={spend.id} spend={spend} currencyCode={currencyCode} />
        ))}
      </div>
    </div>
  );
}
