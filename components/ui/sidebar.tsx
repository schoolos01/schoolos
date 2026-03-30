"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Home, 
  Users, 
  UserSquare2, 
  GraduationCap, 
  Settings, 
  BarChart3,
  LogOut
} from "lucide-react"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Admin", href: "/dashboard/admin", icon: Settings },
  { name: "Teachers", href: "/dashboard/teacher", icon: Users },
  { name: "Students", href: "/dashboard/student", icon: GraduationCap },
  { name: "Guardian", href: "/dashboard/guardian", icon: UserSquare2 },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col fixed left-0 top-0 border-r border-zinc-200 bg-white dark:bg-black dark:border-zinc-800">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tight">SchoolOS</h1>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                isActive 
                  ? "bg-zinc-100 text-black font-medium dark:bg-zinc-900 dark:text-white" 
                  : "text-zinc-500 hover:text-black hover:bg-zinc-50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
        <button className="flex items-center gap-3 px-3 py-2 w-full text-zinc-500 hover:text-black hover:bg-zinc-50 rounded-md transition-colors dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  )
}
