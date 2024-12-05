"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSetting } from "@/hooks/useSetting";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect } from "react";

export const SettingModel = () => {
  const setting = useSetting();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "z" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setting.toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setting.toggle]);

  return (
    <Dialog open={setting.isOpen} onOpenChange={setting.onClose}>
      <DialogContent>
        <DialogTitle className="sr-only">Setting</DialogTitle>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My Setting</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Notion looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};
