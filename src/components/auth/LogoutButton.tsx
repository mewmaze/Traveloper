import { useAuth } from '../../hooks/useAuth';
import { createClient } from '../../utils/supabase/client';

export default function LogoutButton() {
  const { setUser } = useAuth();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }
  return (
    <button onClick={handleLogout} className="py-2 px-4 bg-red-500 text-white rounded">
      로그아웃
    </button>
  );
}
