import type { SpendRecord } from '../../type/spend';

const expenseMethodMap: Record<string, string> = {
  cash: '현금',
  card: '카드',
};

export default function SpendItem({ spend }: { spend: SpendRecord }) {
  return (
    <div className="flex px-3 py-3 bg-gray-50 items-center">
      <div className="flex-1 px-2 border-r border-gray-300">
        {expenseMethodMap[spend.expense_method]}
      </div>
      <div className="flex-[1.5] px-2 border-r border-gray-300">{spend.amount}</div>
      <div className="flex-1 px-2 border-r border-gray-300">{spend.category}</div>
      <div className="flex-[2.5] px-2  break-words line-clamp-2">{spend.memo}</div>
    </div>
  );
}
