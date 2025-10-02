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
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm min-h-14 flex items-center">
        {/* 닉네임 - 옵션 1 */}
        <div className="px-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {user?.user_metadata?.nickname?.charAt(0).toUpperCase()}
          </div>
          <span className="text-primary-text font-medium hidden sm:inline">
            {user?.user_metadata?.nickname}
          </span>
        </div>

        {/* 로고 */}
        <div className="absolute inset-0 flex justify-center items-center cursor-pointer pointer-events-none">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-full w-auto pointer-events-auto"
            onClick={() => router.push(ROOT_PATH)}
          />
        </div>

        {/* 설정 */}
        <div className="px-6 ml-auto relative z-10">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 hover:bg-primary-light/30 rounded-full transition"
          >
            <Settings size={24} color="#05396e" strokeWidth={2} />
          </button>
        </div>
        <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      </div>
    </>
  );
}
