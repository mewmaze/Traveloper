import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function POST(req: Request) {
  const {email,password} = await req.json();
  const supabase=await createClient();

  const errors: Record<string,string>={};
  if(!email) errors.email='이메일을 입력하세요';
  if(!password) errors.password='비밀번호를 입력하세요';

  if(Object.keys(errors).length>0){
    return NextResponse.json({errors}, {status:400});
  }

  const {error} = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if(error) {
    return NextResponse.json({errors: error.message}, {status:400});
  }

  return NextResponse.json({success:true})

}
