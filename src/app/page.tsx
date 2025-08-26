'use client';
import LogoutButton from '../components/auth/LogoutButton';
import { useAuth } from '../hooks/useAuth';
export default function Home() {
  const { user } = useAuth();

  if (!user) {
    return (
      <>
        <p>로그인 해주세요</p>
        <a href="/login">로그인 페이지로 이동</a>
      </>
    );
  }
  return (
    <>
      <h1>환영합니다, {user.email}님!</h1> <LogoutButton />
    </>
  );
}
