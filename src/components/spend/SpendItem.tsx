import type { SpendRecord } from '../../type/spend';

const expenseMethodMap: Record<string, string> = {
  cash: '현금',
  card: '카드',
};

export default function SpendItem({ spend }: { spend: SpendRecord }) {
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-3 mb-2 mx-3 hover:shadow-md transition">
      <div className="flex items-center">
        <div className="flex-1 px-2 flex items-center gap-1 min-w-0">
          <span
            className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${
              spend.expense_method === 'card' ? 'bg-blue-500' : 'bg-cash-gold'
            }`}
          ></span>
          <span className="text-xs sm:text-sm whitespace-nowrap">
            {spend.expense_method === 'card' ? '카드' : '현금'}
          </span>
        </div>

        <div className="flex-[1.5] px-2 text-right font-semibold text-primary-text text-sm">
          {spend.amount.toLocaleString()}원
        </div>

        <div className="flex-1 px-2 text-center">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{spend.category}</span>
        </div>

        <div className="flex-[2.5] px-2 text-xs text-gray-600 truncate">{spend.memo}</div>
      </div>
    </div>
  );
}
