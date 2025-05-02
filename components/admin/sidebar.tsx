"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  BarChart4, 
  Boxes,
  Layout,
  LayoutDashboard, 
  LogOut, 
  Package, 
  Settings,
  ShoppingBag,
  Users 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const navItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: Package,
  },
  {
    title: 'Categories',
    href: '/admin/categories',
    icon: Boxes,
  },
  {
    title: 'Store Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("flex flex-col h-full py-4 border-r border-gray-200", className)}>
      <div className="px-4 mb-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold text-lg text-gray-900">
          <ShoppingBag className="h-6 w-6" />
          <span>Admin Panel</span>
        </Link>
      </div>
      
      <div className="flex-1 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Button
              key={item.href}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2 mb-1",
                !isActive && "hover:bg-gray-100"
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            </Button>
          )
        })}
      </div>
      
      <Separator className="my-4" />
      
      <div className="px-2 space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 hover:bg-gray-100"
          asChild
        >
          <Link href="/">
            <Layout className="h-5 w-5" />
            View Store
          </Link>
        </Button>
        
        <form action="/api/auth/signout" method="post">
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-2 text-gray-900 hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  )
}