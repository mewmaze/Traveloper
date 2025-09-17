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
    .eq('payment', '현금')
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
    <div className="flex gap-2">
      <div className="bg-green-100 flex gap-2 px-4 py-2">
        <span>남은 현금</span>
        <span>{remainCash} </span>
      </div>
      <div className="bg-red-100 flex gap-2 px-4 py-2">
        <span>총 지출</span>
        <span>{totalSpend} </span>
      </div>
    </div>
  );
}
