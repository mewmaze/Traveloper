'use client';
import { useAuth } from '../../hooks/useAuth';
import LogoutButton from '../auth/LogoutButton';
export default function Header() {
  const { user } = useAuth();
  return (
    <div className="flex justify-between items-center px-6 py-2 bg-gray-100 min-h-10 sm:min-h-14">
      <div> {user?.user_metadata?.nickname}</div>
      <LogoutButton />
    </div>
  );
}
