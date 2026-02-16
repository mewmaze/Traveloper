import { createClient } from '../../utils/supabase/server';
export default async function SpendSummary({
  tripId,
  currencyCode,
}: {
  tripId: string;
  currencyCode: string;
}) {
  const supabase = await createClient();

  //총 환전액
  const { data: totalExchangeData } = await supabase
    .from('exchange_records')
    .select('amount.sum()')
    .eq('trip_id', Number(tripId))
    .single();

  //현금 지출 합계
  const { data: totalCashSpendData } = await supabase
    .from('spend_records')
    .select('amount.sum()')
    .eq('trip_id', Number(tripId))
    .eq('expense_method', 'cash')
    .single();
  const totalCashSpend = totalCashSpendData?.sum || 0;
  const totalExchange = totalExchangeData?.sum || 0;

  //남은 현금 계산
  const remainCash = totalExchange - totalCashSpend;

  //총 지출액
  const { data: totalSpendData } = await supabase
    .from('spend_records')
    .select('amount.sum()')
    .eq('trip_id', Number(tripId))
    .single();
  const totalSpend = totalSpendData?.sum || 0;
  return (
    <div className="flex gap-1 sm:gap-4 items-center">
      <div className="flex items-center gap-1 sm:gap-2 px-3 py-2 bg-blue-50 rounded-lg">
        <span className="text-xs text-gray-600">남은 현금</span>
        <span className="text-md sm:text-lg font-bold text-primary-text">
          {remainCash.toLocaleString()}
          <span className="hidden sm:inline"> {currencyCode}</span>
        </span>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 px-3 py-2 bg-indigo-50 rounded-lg">
        <span className="text-xs text-gray-600">총 지출</span>
        <span className="text-md sm:text-lg font-bold text-primary-text">
          {totalSpend.toLocaleString()}
          <span className="hidden sm:inline"> {currencyCode}</span>
        </span>
      </div>
    </div>
  );
}
