import type { User } from '@supabase/supabase-js';
// 인증 컨텍스트 타입
export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

export interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
}
