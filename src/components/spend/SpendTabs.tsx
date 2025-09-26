'use client';

interface SpendTabsProps {
  currentDay: string;
  totalDays: number;
  spendsByDay: Record<number, any[]>;
  onDayChange: (day: string) => void;
}

export default function SpendTabs({ currentDay, totalDays, onDayChange }: SpendTabsProps) {
  return (
    <div className="flex gap-2 mb-2">
      <button
        className={`px-4 py-2 rounded ${currentDay === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        onClick={() => onDayChange('all')}
      >
        전체
      </button>
      {Array.from({ length: totalDays }, (_, index) => {
        const dayNumber = index + 1;
        return (
          <button
            key={dayNumber}
            className={`px-4 py-2 rounded ${
              currentDay === dayNumber.toString() ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => onDayChange(dayNumber.toString())}
          >
            {dayNumber}일차
          </button>
        );
      })}
    </div>
  );
}
