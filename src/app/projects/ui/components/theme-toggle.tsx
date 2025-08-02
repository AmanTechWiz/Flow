// components/theme-toggle.tsx
"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
  <Button
  variant="ghost"
  size={null} // remove preset sizing
  className="h-12 w-12 rounded-full p-2"
  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
>
  {resolvedTheme === "dark" ? (
    <Sun className="h-8 w-100" />
  ) : (
    <Moon className="h-8 w-8" />
  )}
</Button>
  )
}
