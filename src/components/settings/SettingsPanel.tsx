'use client';
import { CircleX } from 'lucide-react';
import LogoutButton from '../auth/LogoutButton';

interface settingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function SettingsPanel({ isOpen, onClose }: settingsPanelProps) {
  return (
    <div>
      {/* 백드롭 */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={onClose} />}
      {/* 설정 패널 */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} `}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">설정</h2>
          <button onClick={onClose}>
            <CircleX size={28} color="#05396e" strokeWidth={2.25} />
          </button>
        </div>
        <div className="flex flex-col p-4">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
