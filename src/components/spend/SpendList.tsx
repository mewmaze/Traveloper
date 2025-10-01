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
}
export default function SpendList({ tripId, data, selectedDay }: SpendListProps) {
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
  console.log(data);
  return (
    <div>
      <SpendTabs
        currentDay={currentDay}
        totalDays={data.tripInfo.totalDays}
        spendsByDay={data.spendsByDay}
        onDayChange={handleDayChange}
      />
      <div className="flex px-3 py-2 bg-gray-50 justify-center items-center mb-2 font-bold">
        <div className="flex-1 px-2 border-r border-gray-300">결제</div>
        <div className="flex-[1.5] px-2 border-r border-gray-300">금액</div>
        <div className="flex-1 px-2 border-r border-gray-300">유형</div>
        <div className="flex-[2.5] px-2">메모</div>
      </div>
      {currentSpends?.map((spend: SpendRecord) => (
        <SpendItem key={spend.id} spend={spend} />
      ))}
    </div>
  );
}
