"use client";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import React from "react";
interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "destructive" | "outline"|"secondary"| "ghost" | "link"| "primary";
}
export const FormSubmit = ({
  children,
  disabled,
  className,
  variant,
}: FormSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={disabled || pending}
      variant={variant}
      size={"sm"}
      className={cn(className)}
    >
      {children}
    </Button>
  );
};
