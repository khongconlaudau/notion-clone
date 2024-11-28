"use client";

import Lottie from "lottie-react";
import React from "react";
import WalkingAnimation from "@/public/Animation/WalkingAnimation.json";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
const DocumentsPage = () => {
  const { user } = useUser();
  return (
    <div className=" h-full flex flex-col max-w-screen-lg items-center justify-center space-y-4">
      <div className="h-[300px] w-[300px]  shadow-sm">
        <Lottie animationData={WalkingAnimation} />
      </div>
      <h2 className="text-lg font-medium ">
        Welcome to {user?.firstName}
        {"'s"} Notion
      </h2>
      <Button>
        <PlusCircle className="h-4 w-4 mr-auto" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
