import { NextResponse } from 'next/server';
import { createClient } from '../../../utils/supabase/server';

export async function POST(req: Request) {
  const { email, password, nickname } = await req.json();
  const supabase = await createClient();

  const errors: Record<string, string> = {};
  if (!email) errors.email = '이메일을 입력하세요';
  if (!password) errors.password = '비밀번호를 입력하세요';
  else if (password.length < 6) errors.password = '비밀번호는 6자 이상이어야 합니다';
  if (!nickname) errors.nickname = '닉네임을 입력하세요';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { nickname } },
  });

  if (error) {
    // 서버에서 발생한 에러는 global로 전달
    return NextResponse.json({ errors: { global: error.message } }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
