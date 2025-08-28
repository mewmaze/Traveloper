'use client';
import { useAuth } from '../../hooks/useAuth';
import Header from './Header';

export default function AuthHeaderWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return (
    <>
      {user && <Header />}
      {children}
    </>
  );
}
