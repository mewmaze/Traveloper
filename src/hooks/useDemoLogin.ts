import { useRouter } from 'next/navigation';
import { createClient } from '../utils/supabase/client';
import { useToast } from './useToast';
export const useDemoLogin = () => {
  const router = useRouter();
  const supabase = createClient();
  const { showToast } = useToast();

  const demoLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: process.env.NEXT_PUBLIC_DEMO_EMAIL!,
      password: process.env.NEXT_PUBLIC_DEMO_PASSWORD!,
    });
    if (error) {
      showToast('데모 로그인에 실패했습니다.', 'error');
      return;
    }
    router.push('/trips');
  };
  return { demoLogin };
};
