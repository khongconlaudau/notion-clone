"use client";
import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/useSearch";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import React from "react";
import { DialogTitle, DialogContent, DialogDescription } from "./ui/dialog";
import { VisuallyHidden } from "@reach/visually-hidden";

const SearchCommand = () => {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.documents.getSearch);
  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((state) => state.toggle);
  const isOpen = useSearch((state) => state.isOpen);
  const onClose = useSearch((state) => state.onClose);

  useEffect(() => {
    setIsMounted(true);
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <VisuallyHidden>
          <DialogTitle>Search</DialogTitle>
        </VisuallyHidden>
        <DialogDescription id="search-description">
          Search through your documents
        </DialogDescription>
        <CommandInput placeholder={`Search ${user?.fullName}'s Notion...`} />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup heading="Documents">
            {documents?.map((doc) => (
              <CommandItem
                key={doc._id}
                value={`${doc._id}-${doc.title}`}
                title={doc.title}
                onSelect={() => onSelect(doc._id)}
              >
                {doc.icon ? (
                  <p className="mr-2 text-[18px]">{doc.icon}</p>
                ) : (
                  <File className="mr-2 h-4 w-4" />
                )}
                <span>{doc.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </DialogContent>
    </CommandDialog>
  );
};

export default SearchCommand;
