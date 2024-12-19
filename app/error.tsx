"use client";

import Lottie from "lottie-react";
import Link from "next/link";
import NotFound from "@/public/Animation/NotFound.json";

import React from "react";
import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Lottie
        animationData={NotFound}
        width="300"
        height="300"
        alt="Error"
        className="hidden md:block"
      />
      <h2 className="text-xl font-medium">Something went wrong</h2>
      <Button asChild>
        <Link href="/documents">Go Back</Link>
      </Button>
    </div>
  );
};

export default Error;
