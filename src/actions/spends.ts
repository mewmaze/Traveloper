'use server';

import { createClient } from '../utils/supabase/server';
import type { SpendRecord } from '../type/spend';
import { differenceInDays, parseISO, startOfDay } from 'date-fns';

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
      .eq('trip_id', tripId);

    if (error) throw error;
    // 클라이언트에서 정렬: date가 없으면 created_at 날짜 사용
    const sortedSpends = (spends || []).sort((a: SpendRecord, b: SpendRecord) => {
      // 둘 다 날짜 부분만 추출
      const dateA = (a.date || a.created_at).split('T')[0];
      const dateB = (b.date || b.created_at).split('T')[0];

      // 날짜 비교
      if (dateA !== dateB) {
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      }

      // 같은 날짜면 created_at으로 비교
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
    //일자별 그룹핑
    const spendsByDay = groupSpendsByDay(sortedSpends || [], trip.start_date);
    //일자별 총합 계산
    const dailyTotals = calculateDailyTotals(spendsByDay);
    const totalDays = differenceInDays(new Date(trip.end_date), new Date(trip.start_date)) + 1;

    return {
      success: true,
      spends: sortedSpends || [],
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
  const startDate = startOfDay(parseISO(tripStartDate));
  const grouped: Record<number, SpendRecord[]> = {};

  spends.forEach((spend) => {
    const dateStr = spend.date || spend.created_at.split('T')[0];
    const spendDate = startOfDay(parseISO(dateStr));

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
