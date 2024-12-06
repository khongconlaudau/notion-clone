"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import Navigation from "./_components/Navigation";
import SearchCommand from "@/components/search-command";
const MainLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [open, setOpen] = React.useState(true);
  const triggerClass: string = open
    ? "absolute translate-x-[-25px] z-[9999] w-hidden"
    : "";

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center ">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <SidebarProvider open={open} onOpenChange={() => setOpen(!open)}>
      <div className="h-full w-full flex dark:bg-[#1b1b1b]">
        <Navigation />
        <main className="w-full">
          <div className="flex ">
            <SidebarTrigger className={triggerClass} />
            {children}
          </div>
          <SearchCommand />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
