import { Suspense } from 'react';
import ExchangeInfoFields from '../../components/form/ExchangeInfoFields';

export default function ExchangePage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ExchangeInfoFields />
    </Suspense>
  );
}
