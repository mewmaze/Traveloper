'use client';
import { useEffect, useState } from 'react';
import SignUpForm from '../../components/form/SignUpForm';
import AnimatedLogo from '../../components/logo/AnimatedLogo';
export default function SignUpPage() {
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowSignUpForm(true), 600);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <AnimatedLogo />
        <div
          className={`transition-all duration-1000 ease-out ${showSignUpForm ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
