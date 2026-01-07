'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import AnimatedLogo from '../components/logo/AnimatedLogo';
import { TRIPS_PATH, LOGIN_PATH, SIGNUP_PATH } from '../constants/routes';
import { useDemoLogin } from '../hooks/useDemoLogin';

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [showButtons, setShowButtons] = useState(false);
  const { demoLogin } = useDemoLogin();
  useEffect(() => {
    if (authLoading) return;

    if (user) {
      router.push(TRIPS_PATH);
    }

    setTimeout(() => setShowButtons(true), 600);
  }, [authLoading, user, router]);

  if (authLoading || user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 -mt-14">
      <div className="w-full max-w-sm space-y-8">
        <AnimatedLogo />
        <div
          className={`space-y-4 mt-12 transition-all duration-1000 ease-out ${
            showButtons ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <button
            onClick={() => router.push(LOGIN_PATH)}
            className="block w-full h-12 rounded-md bg-primary text-white hover:bg-primary-hover cursor-pointer transition"
          >
            로그인
          </button>
          <button
            onClick={() => router.push(SIGNUP_PATH)}
            className="block w-full h-12 rounded-md border border-primary text-primary hover:bg-primary-hover hover:text-white transition"
          >
            회원가입
          </button>
          <button
            onClick={() => demoLogin()}
            className="w-full text-center text-sm text-gray-500 hover:text-primary underline underline-offset-4 transition py-3"
          >
            데모 계정으로 둘러보기
          </button>
        </div>
      </div>
    </div>
  );
}
