'use server';
import { success } from 'zod';
import { createClient } from '../../../utils/supabase/server';
type SpendInput = {
  category: string;
  amount: number;
  expense_method: string;
  memo?: string;
  trip_id: string;
};

export async function createSpendRecourd(input: SpendInput) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { category, amount, expense_method, memo, trip_id } = input;
  const user_id = user?.id;

  // 한국 시간 기준 오늘 날짜
  const currentDate = new Date().toLocaleDateString('sv-SE'); // 'YYYY-MM-DD'

  const { data, error } = await supabase
    .from('spend_records')
    .insert([{ category, amount, expense_method, memo, user_id, trip_id, date: currentDate }]);

  if (error) {
    console.error('지출 기록 생성 실패:', error);
    return { success: false, error };
  }
  return { success: true, data };
}
