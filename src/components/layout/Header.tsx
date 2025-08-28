'use client';
import { useAuth } from '../../hooks/useAuth';
import LogoutButton from '../auth/LogoutButton';
export default function Header() {
  const { user } = useAuth();
  return (
    <div className="flex justify-between p-4 bg-gray-100">
      <div> {user?.user_metadata?.nickname}</div>
      <LogoutButton />
    </div>
  );
}
