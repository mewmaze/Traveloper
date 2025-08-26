'use client';

import AuthLayout from '../layout/AuthLayout';
import AuthInput from '../auth/AuthInput';
import AuthButton from '../auth/AuthButton';
import { useState } from 'react';
//타입
import type { AuthErrors } from '../../app/type/auth';
import type { SignUpForm } from '../../app/type/auth';

export default function SignUpForm() {
  const [form,setForm] = useState<SignUpForm>({
    email:'',
    password:'',
    nickname:'',
  })
  const [error,setError] = useState<AuthErrors>({});

  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    setForm(prev => ({...prev, [e.target.name]:e.target.value}))
  }

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const newErrors: AuthErrors = {};
    if (!form.email) newErrors.email = '이메일을 입력하세요.';
    if (!form.password) newErrors.password = '비밀번호를 입력하세요.';
    else if (form.password.length < 6) newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
    if (!form.nickname) newErrors.nickname = '닉네임을 입력하세요.';

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const result = await res.json();
    if(result.errors) {
      setError(result.errors);
    } else {
      window.location.href='/'
    }
  }
  return (
    <AuthLayout>
    <form className="space-y-4" onSubmit={handleSubmit}>
        <AuthInput
          type="email"
          name="email"
          placeholder="이메일을 입력하세요"
          emoji="📧"
          value={form.email}
          onChange={handleChange}
          error={!!error.email}
          errorMessage={error.email}
        />
        <AuthInput
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          emoji="🔒"
          value={form.password}
          onChange={handleChange}
          error={!!error.password}
          errorMessage={error.password}
        />
        <AuthInput
          type="text"
          name="nickname"
          placeholder="닉네임을 입력하세요"
          emoji="👤"
          value={form.nickname}
          onChange={handleChange}
          error={!!error.nickname}
          errorMessage={error.nickname}
        />
        {error.global && <p className="text-red-500 text-sm mt-2">{error.global}</p>}
        <AuthButton text="회원가입" />
      </form>
    </AuthLayout>
  );
}
