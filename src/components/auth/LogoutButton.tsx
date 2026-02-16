import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { createClient } from '../../utils/supabase/client';
import { ROOT_PATH } from '../../constants/routes';
export default function LogoutButton() {
  const { setUser } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    router.push(ROOT_PATH);
  }
  return (
    <button
      onClick={handleLogout}
      className="px-6 py-2.5 text-sm sm:text-sm sm:px-8 sm:py-3 bg-red-500 text-white rounded"
    >
      로그아웃
    </button>
  );
}
