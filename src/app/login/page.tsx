'use client';
import { useState, useEffect } from 'react';
import LoginForm from '../../components/form/LoginForm';
import AnimatedLogo from '../../components/logo/AnimatedLogo';
export default function LoginPage() {
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowLoginForm(true), 600);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <AnimatedLogo />
        <div
          className={`transition-all duration-1000 ease-out ${showLoginForm ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
