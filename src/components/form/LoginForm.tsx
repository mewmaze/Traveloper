'use client';
import { useState } from 'react';
import AuthLayout from '../layout/AuthLayout';
import AuthInput from '../auth/AuthInput';
import AuthButton from '../auth/AuthButton';
//타입
import type { AuthErrors } from '../../type/auth';
import type { LoginForm } from '../../type/auth';

export default function LoginForm() {
  const [form,setForm] = useState<LoginForm>({email:'',password:''})
  const [error,setError]=useState<AuthErrors>({})

  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    setForm(prev=>({...prev,[e.target.name]:e.target.value}))
  }
async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
   e.preventDefault();
    const newErrors: AuthErrors = {};
    if (!form.email) newErrors.email = '이메일을 입력하세요.';
    if (!form.password) newErrors.password = '비밀번호를 입력하세요.';

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const result = await res.json();
    if (result.errors) {
      setError(result.errors);
    } else {
      window.location.href = '/';
    }
  }

  return (
    <AuthLayout>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <AuthInput type="email" name="email" placeholder="이메일을 입력하세요" emoji="📧" onChange={handleChange}           error={!!error.email}
          errorMessage={error.email}/>
        <AuthInput type="password" name="password" placeholder="비밀번호를 입력하세요" emoji="🔒" onChange={handleChange} error={!!error.password}
          errorMessage={error.password}/>
           {error.global && <p className="text-red-500 text-sm mt-2">{error.global}</p>}
        <AuthButton text="로그인" />
      </form>
    </AuthLayout>
  );
}
