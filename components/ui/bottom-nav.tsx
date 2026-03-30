"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Home, 
  Users, 
  GraduationCap, 
  BarChart3
} from "lucide-react"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Teachers", href: "/dashboard/teacher", icon: Users },
  { name: "Students", href: "/dashboard/student", icon: GraduationCap },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-zinc-200 flex items-center justify-around px-2 dark:bg-black dark:border-zinc-800 z-50">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors",
              isActive 
                ? "text-black dark:text-white" 
                : "text-zinc-500 dark:text-zinc-400"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
