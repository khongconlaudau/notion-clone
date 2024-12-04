"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import Navigation from "./_components/Navigation";
import { SearchCommand } from "@/components/search-command";
const MainLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

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
    <SidebarProvider>
      <div className="h-full w-full flex dark:bg-[#1b1b1b]">
        <Navigation />
        <main className="w-full">
          <SidebarTrigger />
          <SearchCommand />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
