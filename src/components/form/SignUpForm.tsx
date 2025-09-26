'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '../../utils/supabase/client';
import AuthButton from '../auth/AuthButton';
import AuthInput from '../auth/AuthInput';

const signupScheme = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
  nickname: z.string().min(1, '닉네임을 입력하세요.'),
});

type SignUpForm = z.infer<typeof signupScheme>;
export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signupScheme),
  });

  console.log('errors:', errors);

  const onSubmit = async (data: SignUpForm) => {
    const supabase = createClient();
    const { email, password, nickname } = data;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nickname } },
    });
    if (error) {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    } else {
      alert('회원가입에 성공했습니다!');
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
        <AuthInput
          {...register('nickname')}
          type="text"
          placeholder="닉네임"
          error={!!errors.nickname}
          errorMessage={errors.nickname?.message}
        />
        <AuthButton text="회원가입" />
      </form>
    </div>
  );
}
