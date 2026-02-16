import CategoryPieChart from '../../components/spend/CategoryPieChart';
import DailyLineChart from '../../components/spend/DailyLineChart';
import Image from 'next/image';
import { getCurrencyCode } from '../../actions/exchange';

interface SpendStatsPageProps {
  searchParams: Promise<{ tripId?: string }>;
}

export default async function spendStatsPage({ searchParams }: SpendStatsPageProps) {
  const { tripId } = await searchParams;
  if (!tripId) {
    return <div>tripId가 없습니다.</div>;
  }
  const currencyCode = (await getCurrencyCode(Number(tripId))) ?? '원';
  return (
    <div className="flex flex-col gap-20 p-6">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Image src="/sparkle.svg" alt="반짝이이미지" width={32} height={32} className="w-8" />
          <span className="text-xl">카테고리별 통계</span>
        </div>
        <CategoryPieChart tripId={tripId} currencyCode={currencyCode} />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Image src="/sparkle.svg" alt="반짝이이미지" width={32} height={32} className="w-8" />
          <span className="text-xl">데일리별 통계</span>
        </div>
        <DailyLineChart tripId={tripId} currencyCode={currencyCode} />
      </div>
    </div>
  );
}
