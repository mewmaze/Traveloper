'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AnimatedLogo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center mb-8">
      <div className="relative">
        {/* 실제 공간을 차지하는 투명한 placeholder */}
        <div className="w-auto opacity-0">
          <Image src="/logo.svg" alt="" className="w-auto h-full" />
        </div>
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            className={`absolute top-0 left-0 w-full h-auto transition-all duration-1000 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            draggable={false}
          />
        </Link>
      </div>
    </div>
  );
}
