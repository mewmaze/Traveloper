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

  // date 컬럼 추가
  const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD 형식

  const { data, error } = await supabase
    .from('spend_records')
    .insert([{ category, amount, expense_method, memo, user_id, trip_id, date: currentDate }]);
  if (error) {
    console.error('지출 기록 생성 실패:', error);
    return { success: false, error };
  }
  return { success: true, data };
}
