"use client";
import SearchCommand from "@/components/search-command";
import { Spinner } from "@/components/spinner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import Navigation from "./_components/Navigation";
const MainLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [open, setOpen] = React.useState(true);

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
      <Navigation />
      <main className="w-full">
        <SidebarTrigger />
        {children}
        <SearchCommand />
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
