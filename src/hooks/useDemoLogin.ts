import { useRouter } from 'next/navigation';
import { createClient } from '../utils/supabase/client';
export const useDemoLogin = () => {
  const router = useRouter();
  const supabase = createClient();

  const demoLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: process.env.NEXT_PUBLIC_DEMO_EMAIL!,
      password: process.env.NEXT_PUBLIC_DEMO_PASSWORD!,
    });
    if (error) {
      console.error('데모 로그인 실패:', error.message);
      return;
    }
    router.push('/trips');
  };
  return { demoLogin };
};
