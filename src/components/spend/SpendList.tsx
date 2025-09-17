'use server';
import { createClient } from '../../utils/supabase/server';
import SpendItem from './SpendItem';
import type { SpendRecord } from '../../type/spend';

export default async function SpendList({ tripId }: { tripId: string }) {
  const supabase = await createClient();
  const { data: spends, error } = await supabase
    .from('spend_records')
    .select('*')
    .eq('trip_id', Number(tripId))
    .order('created_at', { ascending: false });

  if (error) return <div>지출 내역을 불러올 수 없습니다.</div>;

  return (
    <div>
      <div className="flex px-3 py-2 bg-gray-50 items-center mb-2 font-bold">
        <div className="flex-1 px-2 border-r border-gray-300">카드/현금</div>
        <div className="flex-1 px-2 border-r border-gray-300">금액</div>
        <div className="flex-1 px-2 border-r border-gray-300">유형</div>
        <div className="flex-[3] px-2">메모</div>
      </div>
      {spends?.map((spend: SpendRecord) => (
        <SpendItem key={spend.id} spend={spend} />
      ))}
    </div>
  );
}
