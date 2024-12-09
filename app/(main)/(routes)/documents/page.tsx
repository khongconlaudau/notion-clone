"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import WalkingAnimation from "@/public/Animation/WalkingAnimation.json";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import Lottie from "lottie-react";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const router = useRouter();
  const onCreate = () => {
    const promise = create({
      title: "Untitled",
    });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "A new note created!",
      error: "Faid to create a new note.",
    });
    promise.then((documentId) => {
      router.push(`/documents/${documentId}`);
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
