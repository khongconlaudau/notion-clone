"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import Lottie from "lottie-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import FireWorkAnimation from "@/public/Animation/FireworkAnimation.json";
const Header = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4 ">
      <h1 className="relative capitalize text-3xl sm:text-5xl md:text-6xl font-bold">
        Your ideas, documents, & plans. Unified. Welcome to{" "}
        <span className="bg-gradient-to-t from-sky-400 to-zinc-100 bg-clip-text text-transparent">
          Notion
        </span>{" "}
        <div className="w-[50px] absolute right-5 sd:top-20 sd:right-36 lg:top-16 md:w-[100px]">
          <Lottie animationData={FireWorkAnimation} />
        </div>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Notion is the connected workspace where <br />
        better, faster work happens
      </h3>
      {isLoading && (
        <div className="w-full flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Notion
            <ArrowRight className="h-4 w-4 ml-auto mb-[1px]" />
          </Link>
        </Button>
      )}

      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Notion Free
            <ArrowRight className="h-4 w-4 ml-auto mb-[1px]" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Header;
