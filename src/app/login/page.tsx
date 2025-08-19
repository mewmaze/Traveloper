'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const handleLogin = () => {
    router.push('/');
  };
  const handleSignup = () => {
    router.push('/register');
  };
  return (
    <>
      <div>로그인페이지</div>
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleSignup}>회원가입</button>
    </>
  );
}
