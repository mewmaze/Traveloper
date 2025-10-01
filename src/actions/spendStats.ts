'use server';

import { createClient } from '../utils/supabase/server';
//카테고리별 통계(원형차트)
interface CategoryStateRow {
  category_name: string;
  total_amount: number;
}
export async function getSpendStats(tripId: string) {
  const supabase = await createClient();
  if (!tripId) {
    throw new Error('Trip ID is required');
  }
  const { data, error } = await supabase.rpc('get_spend_stats', { p_trip_id: parseInt(tripId) });
  if (error) {
    console.error('Error fetching category stats:', error);
    throw error;
  }
  return data.map((item: CategoryStateRow) => ({
    name: item.category_name,
    value: Number(item.total_amount),
  }));
}

interface DailyStatRow {
  spend_date: string;
  total_amount: number;
}
//날짜별 통계(라인차트)
export async function getDailyStats(tripId: string) {
  const supabase = await createClient();
  if (!tripId) {
    throw new Error('Trip ID is required');
  }
  const { data, error } = await supabase.rpc('get_daily_spend_stats', {
    p_trip_id: parseInt(tripId),
  });
  if (error) {
    console.error('Error fetching daily stats:', error);
    throw error;
  }

  if (!data || data.length === 0) {
    return [];
  }

  return (data as DailyStatRow[]).map((item) => ({
    date: item.spend_date,
    amount: Number(item.total_amount),
  }));
}
