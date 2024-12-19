"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "./ui/skeleton";

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}
const Cover = ({ url, preview }: CoverImageProps) => {
  const params = useParams();
  const coverImage = useCoverImage();
  const removeConverImage = useMutation(api.documents.removeCoverImage);
  const { edgestore } = useEdgeStore();

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    removeConverImage({ id: params.documentId as Id<"documents"> });
  };
  return (
    <div
      className={cn(
        "relative w-full h-[30vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-2 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-sm"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 " />
            Change Cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-sm"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 " />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSekeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
export default Cover;
