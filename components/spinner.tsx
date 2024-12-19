"use client";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";

const spinnerVarients = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "h-4 w-4",
      sm: "h-2 w-2",
      lg: "h-6 w-6",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

// Use VariantProps<typeof spinnerVarients> directly
export const Spinner = ({ size }: VariantProps<typeof spinnerVarients>) => {
  return <Loader className={cn(spinnerVarients({ size }))} />;
};
