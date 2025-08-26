import type { User } from "@supabase/supabase-js";
//회원가입 로그인 에러 타입
export interface AuthErrors {
  email?:string;
  password?:string;
  nickname?:string;
  global?:string;
}

// 회원가입 폼 타입
export interface SignUpForm {
  email: string;
  password: string;
  nickname: string;
}

// 로그인 폼 타입
export interface LoginForm {
  email: string;
  password: string;
}
// 인증 컨텍스트 타입
export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}