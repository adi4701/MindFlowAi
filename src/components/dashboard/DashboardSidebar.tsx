
"use client";

import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarGroup,
  SidebarFooter
} from '@/components/ui/sidebar';
import { MessageSquare, BookOpen, History, LogOut, User, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Atmosphere', icon: MessageSquare, href: '/dashboard' },
    { label: 'Journal', icon: BookOpen, href: '/dashboard/journal' },
    { label: 'Archive', icon: History, href: '/dashboard/history' },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r border-white/5 bg-background">
      <SidebarHeader className="p-8">
        <Link href="/" className="flex items-center gap-3 px-2">
          <Sparkles className="w-5 h-5 text-white/50" />
          <span className="font-serif italic text-lg text-white group-data-[collapsible=icon]:hidden">
            MindFlow
          </span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarMenu className="space-y-2">
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  className={`h-12 rounded-none transition-all duration-500 ${pathname === item.href ? 'bg-white/5 text-white border-l border-white' : 'text-white/30 hover:text-white hover:bg-white/5'}`}
                >
                  <Link href={item.href} className="flex items-center gap-4">
                    <item.icon className="w-4 h-4" />
                    <span className="mono-label tracking-widest !text-inherit">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Identity" className="h-12 text-white/20 hover:text-white transition-colors">
                <User className="w-4 h-4" />
                <span className="mono-label tracking-widest !text-inherit">Identity</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-8 border-t border-white/5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Terminate Session" className="text-white/20 hover:text-white transition-colors h-12">
              <LogOut className="w-4 h-4" />
              <span className="mono-label tracking-widest !text-inherit">Terminate</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
