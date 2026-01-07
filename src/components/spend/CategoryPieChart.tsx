'use client';
import { useState, useEffect } from 'react';
import { getSpendStats } from '../../actions/spendStats';
import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

interface CategoryPieChartProps {
  tripId: string;
}

export default function CategoryPieChart({ tripId }: CategoryPieChartProps) {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getSpendStats(tripId);
        setChartData(data);
      } catch (err) {
        console.error(err);
        setError('데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tripId]);

  // 로딩 중
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div>로딩중...</div>
      </div>
    );
  }

  // 에러 발생
  if (error) {
    return <div className="flex items-center justify-center h-[300px] text-red-500">{error}</div>;
  }

  // 데이터 없음
  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-500">
        지출 데이터가 없습니다.
      </div>
    );
  }

  // 차트 렌더링
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value?: number) => (value !== undefined ? `${value.toLocaleString()}원` : '')}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
