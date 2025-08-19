"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const {theme, setTheme} = useTheme();
  const [mounted, setmounted] = useState(false);

  useEffect(()=>
    setmounted(true)
  ,[])
  if(!mounted) return null;
  return (
    <button onClick={()=> setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  );
}
