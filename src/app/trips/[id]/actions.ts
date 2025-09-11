'use server';
import { createClient } from '../../../utils/supabase/server';
export async function createSpendRecourd(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const category = formData.get('category') as string;
  const amount = formData.get('amount') as string;
  const payment = formData.get('payment') as string;
  const memo = formData.get('memo') as string;
  const trip_id = formData.get('trip_id') as string;
  const user_id = user?.id;

  await supabase
    .from('spend_records')
    .insert([{ category, amount, payment, memo, user_id, trip_id }]);
}
