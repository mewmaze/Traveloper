'use client';
import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getDailyStats } from '../../actions/spendStats';

interface DailyLineChartProps {
  tripId: string;
}

export default function DailyLineChart({ tripId }: DailyLineChartProps) {
  const [chartData, setChartData] = useState<{ date: string; amount: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getDailyStats(tripId);
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
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div>로딩중...</div>
      </div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center h-[300px] text-red-500">{error}</div>;
  }

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-500">
        지출 데이터가 없습니다.
      </div>
    );
  }
  return (
    <div className="flex justify-center w-full mb-10 ">
      <ResponsiveContainer width="80%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ dy: 10 }} />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [`${value.toLocaleString()}원`]}
            labelFormatter={(label) => `${label}`}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ fill: '#8884d8', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
