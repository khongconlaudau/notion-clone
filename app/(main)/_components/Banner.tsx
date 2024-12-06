"use client";
import ConfirmModel from "@/components/modals/ConfirmModel";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface BannerProps {
  documentId: Id<"documents">;
}

const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting document...",
      success: "Document deleted!",
      error: "Failed to delete document.",
    });

    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document restored!",
      error: "Failed to restore document.",
    });
  };

  return (
    <div className="w-full bg-rose-600 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is Archived</p>
      <Button
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white p-1 px-2 h-auto font-normal"
      >
        Restore
      </Button>
      <ConfirmModel onConfirm={onRemove}>
        <Button
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white p-1 px-2 h-auto font-normal"
        >
          Delete Forever
        </Button>
      </ConfirmModel>
    </div>
  );
};

export default Banner;
