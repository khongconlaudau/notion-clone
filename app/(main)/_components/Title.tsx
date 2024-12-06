"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React, { useRef, useState } from "react";

interface TitlteProps {
  initialData: Doc<"documents">;
}
const Title = ({ initialData }: TitlteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initialData.title || "Untitled");
  const update = useMutation(api.documents.update);
  const [isEditing, setIsEditing] = React.useState(false);

  const enableEditing = () => {
    if (!initialData.isArchived) {
      setTitle(initialData.title);
      setIsEditing(true);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
      }, 0);
    }
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    update({
      id: initialData._id,
      title: event.target.value || "Untitled",
    });
  };

  const OnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableEditing();
    }
  };

  return (
    <div className="flex items-center gap-x-1 ml-10">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableEditing}
          onBlur={disableEditing}
          onChange={onChange}
          onKeyDown={OnKeyDown}
          value={title}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableEditing}
          variant="ghost"
          className="font-normal h-auto p-1"
        >
          <span className="truncate">{initialData.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton />;
};

export default Title;
