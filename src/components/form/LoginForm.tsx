'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '../../utils/supabase/client';
import AuthButton from '../auth/AuthButton';
import AuthInput from '../auth/AuthInput';
import { useToast } from '../../hooks/useToast';

const loginScheme = z.object({
  email: z.email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
});

type LoginForm = z.infer<typeof loginScheme>;
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginScheme),
  });

  const { showToast } = useToast();
  const onSubmit = async (data: LoginForm) => {
    const supabase = createClient();
    const { email, password } = data;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      showToast('로그인에 실패했습니다. 다시 시도해주세요.', 'error');
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <AuthInput
          {...register('email')}
          type="email"
          placeholder="이메일"
          error={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <AuthInput
          {...register('password')}
          type="password"
          placeholder="비밀번호"
          error={!!errors.password}
          errorMessage={errors.password?.message}
        />
        <AuthButton text="로그인" />
      </form>
      <div className="mt-4 flex justify-center">
        <p className="text-md">
          계정이 없으신가요?{' '}
          <a href="/register" className="text-blue-500 font-bold cursor-pointer">
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
}
