"use client";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

const NavBar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",
        scolled && "border-b shadow-sm"
      )}
    >
      <Logo />

      <div className="justify-between w-full flex items-center gap-x-2 md:justify-end">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>

            <SignInButton mode="modal">
              <Button size="sm">Get Notion Free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Notion</Link>
            </Button>
            <UserButton />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavBar;
