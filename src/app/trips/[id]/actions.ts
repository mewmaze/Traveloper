'use server';
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

  await supabase
    .from('spend_records')
    .insert([{ category, amount, expense_method, memo, user_id, trip_id }]);
}
