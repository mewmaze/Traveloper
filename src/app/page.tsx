import { createClient } from "../utils/supabase/server";
export default async function Home() {
  const supabase=await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div>
      {user ? (
        <p>환영합니다, {user.email}님!</p>
      ) : (
        <p>로그인 해주세요.</p>
      )}
    </div>
  )
}
