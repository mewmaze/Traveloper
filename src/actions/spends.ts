'use server';

import { createClient } from '../utils/supabase/server';
import type { SpendRecord } from '../type/spend';
import { differenceInDays } from 'date-fns';

export async function getSpendByTrip(tripId: string) {
  const supabase = await createClient();

  try {
    //여행 정보 조회
    const { data: trip } = await supabase
      .from('trips')
      .select('start_date,end_date')
      .eq('id', tripId)
      .single();

    if (!trip) throw new Error('Trip not found');

    //모든 지출 조회
    const { data: spends, error } = await supabase
      .from('spend_records')
      .select('*')
      .eq('trip_id', tripId)
      .order('date', { ascending: true }) // 날짜순 (오래된 날짜부터)
      .order('created_at', { ascending: false }); // 같은 날짜 내에서는 최신 작성순

    if (error) throw error;

    //일자별 그룹핑
    const spendsByDay = groupSpendsByDay(spends || [], trip.start_date);
    //일자별 총합 계산
    const dailyTotals = calculateDailyTotals(spendsByDay);
    const totalDays = differenceInDays(new Date(trip.end_date), new Date(trip.start_date)) + 1;

    return {
      success: true,
      spends: spends || [],
      spendsByDay,
      dailyTotals,
      tripInfo: { totalDays, start_date: trip.start_date, end_date: trip.end_date },
    };
  } catch (error) {
    console.error('Failed to fetch spends:', error);
    return { success: false, spends: [], spendsByDay: {}, tripInfo: null };
  }
}

function groupSpendsByDay(spends: SpendRecord[], tripStartDate: string) {
  const startDate = new Date(tripStartDate);
  const grouped: Record<number, SpendRecord[]> = {};

  spends.forEach((spend) => {
    const spendDate = new Date(spend.date);
    const dayNumber = differenceInDays(spendDate, startDate) + 1;
    if (dayNumber >= 1) {
      if (!grouped[dayNumber]) grouped[dayNumber] = [];
      grouped[dayNumber].push(spend);
    }
  });
  return grouped;
}

function calculateDailyTotals(spendsByDay: Record<number, SpendRecord[]>) {
  const totals: Record<number, number> = {};
  Object.entries(spendsByDay).forEach(([day, spends]) => {
    totals[Number(day)] = spends.reduce((sum, spend) => sum + spend.amount, 0);
  });
  return totals;
}
