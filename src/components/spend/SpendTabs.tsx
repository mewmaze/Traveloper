'use client';
import type { SpendRecord } from '../../type/spend';

interface SpendTabsProps {
  currentDay: string;
  totalDays: number;
  spendsByDay: Record<number, SpendRecord[]>;
  onDayChange: (day: string) => void;
}

export default function SpendTabs({ currentDay, totalDays, onDayChange }: SpendTabsProps) {
  return (
    <div className="overflow-x-auto scrollbar-hide ml-2">
      <div className="flex gap-2 mb-2">
        <button
          className={`px-4 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 text-sm font-medium transition-all ${currentDay === 'all' ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          onClick={() => onDayChange('all')}
        >
          전체
        </button>
        {Array.from({ length: totalDays }, (_, index) => {
          const dayNumber = index + 1;
          return (
            <button
              key={dayNumber}
              className={`px-4 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 text-sm font-medium transition-all ${
                currentDay === dayNumber.toString()
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => onDayChange(dayNumber.toString())}
            >
              {dayNumber}일차
            </button>
          );
        })}
      </div>
    </div>
  );
}
