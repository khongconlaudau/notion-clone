"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import Title from "./Title";
import Banner from "./Banner";
import Menu from "./Menu";
import Publish from "./publish";

const Navbar = () => {
  const params = useParams();
  const document = useQuery(api.documents.getDocByID, {
    id: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <span className="bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center gap-x-4">
        <Title.Skeleton />
      </span>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
            <Publish initialData={document} />
            {!document.isArchived && <Menu documentId={document._id} />}
          </div>
        </div>
        {document.isArchived && <Banner documentId={document._id} />}
      </div>
    </>
  );
};

export default Navbar;
