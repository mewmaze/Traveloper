'use client';

import AuthLayout from '../layout/AuthLayout';
import AuthInput from '../auth/AuthInput';
import AuthButton from '../auth/AuthButton';
import { login } from '../../app/login/actions';

export default function LoginForm() {
  return (
    <AuthLayout>
      <form className="space-y-4">
        <AuthInput type="email" name="email" placeholder="이메일을 입력하세요" emoji="📧" />
        <AuthInput type="password" name="password" placeholder="비밀번호를 입력하세요" emoji="🔒" />
        <AuthButton text="로그인" />
      </form>
    </AuthLayout>
  );
}
