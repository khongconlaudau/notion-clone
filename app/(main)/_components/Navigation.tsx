"use client";
import React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsLeftRight, ChevronsUpDown, Home, Inbox } from "lucide-react";
import { it } from "node:test";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SignOutButton, useUser } from "@clerk/clerk-react";
const items = [
  {
    title: "Home",
    url: "/documents",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
];
const Navigation = () => {
  const { user } = useUser();

  const signedInWithGitHub = user?.externalAccounts.some(
    (account) => account.provider === "github"
  );
  const userEmail: string = user?.emailAddresses[0].emailAddress!;
  return (
    <Sidebar className="bg-[#1b1b1b]">
      <SidebarHeader className="font-bold">Documents</SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Docmument</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center space-x-1 w-full group">
            <Avatar>
              <AvatarImage src={user?.imageUrl} className="rounded-sm" />
            </Avatar>
            {!signedInWithGitHub ? (
              <div className="flex h-full items-center justify-center space-x-2 text-gray-600 overflow-hidden">
                <span className="text-xs font-bold">
                  {user?.emailAddresses[0].emailAddress}
                </span>
                <ChevronsUpDown className="group-hover:scale-125 transition-transform duration-200" />
              </div>
            ) : (
              <div className="flex flex-col h-full w-full text-sm items-start text-gray-600">
                <span className="font-bold ">{user?.firstName}</span>
                <span>{user?.username}</span>
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right">
            <DropdownMenuLabel className="flex items-center space-x-1 w-full">
              <Avatar>
                <AvatarImage src={user?.imageUrl} className="rounded-sm" />
              </Avatar>
              {!signedInWithGitHub ? (
                <div className="flex h-full items-center justify-center text-gray-600">
                  <span>{user?.emailAddresses[0].emailAddress}</span>
                </div>
              ) : (
                <div className="flex flex-col h-full w-full text-sm items-start text-gray-600">
                  <span className="font-bold ">{user?.firstName}</span>
                  <span className="font-light">{user?.username}</span>
                </div>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-300 " />
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="w-full cursor-pointer text-muted-foreground"
            >
              <SignOutButton>Log Out</SignOutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Navigation;
