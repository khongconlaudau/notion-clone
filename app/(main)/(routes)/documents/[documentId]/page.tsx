"use client";

import Navbar from "@/app/(main)/_components/Navbar";
import Toolbar from "@/components/Toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";

const DocumentIdPage = () => {
  const params = useParams();
  const document = useQuery(api.documents.getDocByID, {
    id: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return <div>Loading...</div>;
  }

  if (document === null) {
    return <div>Document not found</div>;
  }
  return (
    <div>
      <div className=" w-full">
        <Navbar />
      </div>
      <div className="h-[20vh] w-full" />
      <div>
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
          <Toolbar initialData={document} />
        </div>
      </div>
    </div>
  );
};

export default DocumentIdPage;
