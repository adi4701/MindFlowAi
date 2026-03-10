"use client";

import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter
} from '@/components/ui/sidebar';
import { MessageSquare, BookOpen, History, Settings, Sparkles, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'AI Companion', icon: MessageSquare, href: '/dashboard' },
    { label: 'Journal', icon: BookOpen, href: '/dashboard/journal' },
    { label: 'History', icon: History, href: '/dashboard/history' },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-card">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-headline font-bold text-lg group-data-[collapsible=icon]:hidden">
            MindFlow AI
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Main</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  className="h-11"
                >
                  <Link href={item.href}>
                    <item.icon className="w-5 h-5" />
                    <span className="font-body font-medium">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Account</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Profile" className="h-11">
                <User className="w-5 h-5" />
                <span className="font-body">Profile</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings" className="h-11">
                <Settings className="w-5 h-5" />
                <span className="font-body">Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Log Out" className="text-muted-foreground hover:text-destructive transition-colors h-11">
              <LogOut className="w-5 h-5" />
              <span className="font-body">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}