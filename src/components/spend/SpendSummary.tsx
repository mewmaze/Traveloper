import { createClient } from '../../utils/supabase/server';
export default async function SpendSummary({ tripId }: { tripId: string }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  //총 환전액
  const { data: totalExchangeData, error } = await supabase
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
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
        <span className="text-xs text-gray-600">남은 현금</span>
        <span className="text-lg font-bold text-primary-text">{remainCash.toLocaleString()}원</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 rounded-lg">
        <span className="text-xs text-gray-600">총 지출</span>
        <span className="text-lg font-bold text-primary-text">{totalSpend.toLocaleString()}원</span>
      </div>
    </div>
  );
}
