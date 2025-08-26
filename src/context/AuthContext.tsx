
import { createContext, useEffect, useState } from "react";
import type { AuthContextType } from "../type/auth";
import type { User } from "@supabase/supabase-js";
import { createClient } from "../utils/supabase/client";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}:{children:React.ReactNode}) {
  const [user,setUser]=useState<User|null>(null);

  useEffect(()=>{
    const supabase=createClient();
    supabase.auth.getUser().then(({data})=> setUser(data.user))

    const {data: {subscription},}=supabase.auth.onAuthStateChange((_event,session)=>{
      setUser(session?.user??null)
    })

    return ()=> subscription.unsubscribe()
  },[])
  return (
    <AuthContext.Provider value={{user,setUser}}>{children}</AuthContext.Provider>
  )
}