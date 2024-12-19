"use client";

import Cover from "@/components/Cover";
import { Editor } from "@/components/DynamicEditor";
import Toolbar from "@/components/Toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";

const DocumentIdPage = () => {
  const params = useParams();
  const document = useQuery(api.documents.getDocByID, {
    id: params.documentId as Id<"documents">,
  });

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: params.documentId as Id<"documents">,
      content,
    });
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Document not found</div>;
  }
  return (
    <div>
      <Cover preview url={document.coverImage} />
      <div>
        <div className="md:max-w-3xl lg:max-w-6xl mx-auto">
          <Toolbar preview initialData={document} />
          <Editor
            editable={false}
            onChange={onChange}
            initialContent={document.content}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentIdPage;
