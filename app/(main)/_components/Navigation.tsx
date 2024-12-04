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
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronsLeftRight,
  ChevronsUpDown,
  Home,
  Inbox,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Item from "./Item";
import { toast } from "sonner";
import DocumentList from "./DocumentList";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { useIsMobile } from "@/hooks/use-mobile";
import TrashBox from "./TrashBox";
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
  const create = useMutation(api.documents.create);
  const isMobile = useIsMobile();

  const signedInWithGitHub = user?.externalAccounts.some(
    (account) => account.provider === "github"
  );

  const handleCreate = () => {
    const promise = create({
      title: "Untitled",
    });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "A new note created!",
      error: "Failed to create a new note.",
    });
  };
  return (
    <Sidebar className="bg-[#1b1b1b]">
      <SidebarHeader className="font-bold">Documents</SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Docmument</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Item
                  label="Search"
                  isSearch
                  icon={Search}
                  onclick={() => {}}
                />
                <Item
                  onclick={handleCreate}
                  label="New Page"
                  icon={PlusCircle}
                />
              </SidebarMenuItem>
              <DocumentList />
              <Item onclick={handleCreate} icon={Plus} label="Add a page" />
              <Popover>
                <PopoverTrigger className="w-full mt-4">
                  <Item icon={Trash} label="Trash" />
                </PopoverTrigger>
                <PopoverContent
                  className="p-0 w-72 rounded-sm border shadow-md font-medium"
                  side={isMobile ? "bottom" : "right"}
                >
                  <TrashBox />
                </PopoverContent>
              </Popover>
              {/* documents */}
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
            <DropdownMenuItem>
              <div className="w-full translate-x-[-12px]">
                <Item label="Setting" icon={Settings} onclick={() => {}} />
              </div>
            </DropdownMenuItem>

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
