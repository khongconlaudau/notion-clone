"use client";
import SearchCommand from "@/components/search-command";
import { Spinner } from "@/components/spinner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Navigation from "./_components/Navigation";
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
      <Navigation />
      <main className="w-full dark:bg-[#1f1f1f]">
        {/* <div className="flex w-full"> */}
        <SidebarTrigger />
        {/* <div className="w-full">
            <Navbar />
          </div> */}
        {/* </div> */}
        {children}
        <SearchCommand />
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
