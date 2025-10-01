"use client";

import * as React from "react";
import {
  LifeBuoy,
  Send,
  UserSearch,
  Bookmark
} from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavSecondary } from "@/components/dashboard/nav-secondary";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUser } from "@/app/context/UserContext";
import Link from "next/link";
import psiboard from "@/public/psiboard.png";
import Image from "next/image";

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const data = {
    user: {
      name: user?.name || "",
      email: user?.email || "",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Profissionais",
        url: "#",
        icon: UserSearch,
        items: [
          {
            title: "Cadastrar Profissional",
            url: "#",
          },
          {
            title: "Listar Profissionais",
            url: "#",
          },
        ],
      },
      {
        title: "Controle de Agendamentos",
        url: "#",
        icon: Bookmark,
        items: [
          {
            title: "Agendamentos por profissional",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Supporte",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
  };
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <div>
                  <Link
                    href="/dashboard"
                    className=""
                  >
                    <Image src={psiboard} alt="logo.png" width={54} />
                  </Link>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-base">Clinicboard</span>
                  <span className="truncate text-xs">LTDA</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
