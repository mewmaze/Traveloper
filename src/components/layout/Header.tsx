'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { Settings } from 'lucide-react';
import SettingsPanel from '../settings/SettingsPanel';
import { ROOT_PATH } from '../../constants/routes';

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 relative bg-gray-100 min-h-14 flex items-center">
        {/* 좌측 padding 요소 */}
        <div className="px-6">{user?.user_metadata?.nickname}</div>
        {/* 로고는 중앙 절대 위치 */}
        <div className="absolute inset-0 flex justify-center items-center cursor-pointer">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-full w-auto"
            onClick={() => router.push(ROOT_PATH)}
          />
        </div>
        {/* 우측 padding 요소 */}
        <div className="px-6 ml-auto relative z-10 flex items-center">
          <button onClick={() => setIsSettingsOpen(true)}>
            <Settings size={28} color="#05396e" strokeWidth={2.25} />
          </button>
        </div>
      </div>
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
