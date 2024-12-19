"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { api } from "@/convex/_generated/api";
import { SignOutButton, useUser } from "@clerk/clerk-react";

import { useMutation } from "convex/react";
import {
  ChevronsUpDown,
  Home,
  HomeIcon,
  Inbox,
  LogOut,
  LogOutIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { toast } from "sonner";
import DocumentList from "./DocumentList";
import Item from "./Item";
import TrashBox from "./TrashBox";
import { useSearch } from "@/hooks/useSearch";
import { useSetting } from "@/hooks/useSetting";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const search = useSearch();
  const setting = useSetting();
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const router = useRouter();
  const signedInWithGitHub = user?.externalAccounts.some(
    (account) => account.provider === "github"
  );

  const goToMainPage = () => {
    router.push("/documents");
  };

  const handleCreate = () => {
    const promise = create({
      title: "Untitled",
    });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "A new note created!",
      error: "Failed to create a new note.",
    });

    promise.then((documentId) => {
      router.push(`/documents/${documentId}`);
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
                <Item label="Home" onclick={goToMainPage} icon={Home} />
                <Item
                  label="Search"
                  isSearch
                  icon={Search}
                  onclick={search.onOpen}
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
                <PopoverContent className="p-0 w-72 rounded-sm border shadow-md font-medium">
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
              <AvatarImage src={user?.imageUrl} className="rounded-sm " />
            </Avatar>
            {!signedInWithGitHub ? (
              <div className="flex h-full items-center justify-center space-x-2 text-gray-600 overflow-hidden">
                <span className="text-xs font-bold text-muted-foreground">
                  {user?.emailAddresses[0].emailAddress}
                </span>
                <ChevronsUpDown className="group-hover:scale-125 transition-transform duration-200" />
              </div>
            ) : (
              <div className="flex flex-col h-full w-full text-sm items-start text-muted-foreground">
                <span
                  className="fon
                t-bold "
                >
                  {user?.firstName}
                </span>
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
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <span>{user?.emailAddresses[0].emailAddress}</span>
                </div>
              ) : (
                <div className="flex flex-col h-full w-full text-sm items-start text-muted-foreground">
                  <span className="font-bold ">{user?.firstName}</span>
                  <span className="font-light">{user?.username}</span>
                </div>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="w-full translate-x-[-12px] flex justify-between">
                <Item
                  label="Setting"
                  icon={Settings}
                  onclick={setting.onOpen}
                />
                <kbd
                  className=" bg-transparent border
                text-xs pt-1.5 font-thin w-full ml-14 text-muted-foreground rounded-sm p-1"
                >
                  CTRL Z
                </kbd>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              className="w-full cursor-pointer text-muted-foreground flex gap-x-1"
            >
              <div className="translate-x-[-6px]">
                <LogOutIcon className="w-4 h-4 text-muted-foreground" />
                <SignOutButton>Log Out</SignOutButton>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Navigation;
