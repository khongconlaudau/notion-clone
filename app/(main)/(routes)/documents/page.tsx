"use client";

import Lottie from "lottie-react";
import React from "react";
import WalkingAnimation from "@/public/Animation/WalkingAnimation.json";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({
      title: "Untitled",
    });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "A new note created!",
      error: "Faid to create a new note.",
    });
  };
  return (
    <div className=" h-full flex flex-col max-w-screen-lg items-center justify-center space-y-4">
      <div className="h-[300px] w-[300px]">
        <Lottie animationData={WalkingAnimation} />
      </div>
      <h2 className="text-lg font-medium ">
        Welcome to {user?.firstName}
        {"'s"} Notion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-auto" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
