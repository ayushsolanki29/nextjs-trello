"use client";

import { forwardRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormErrors } from "./form-errors";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type = "text",
      placeholder,
      required = false,
      disabled = false,
      errors,
      className,
      defaultValue = "",
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? <Label htmlFor={id} className="text-xs font-semibold text-neutral-700">{label}</Label> : null}
          <Input
            ref={ref}
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            required={required}
            disabled={disabled || pending}
            className={`text-sm px-2 h-7 py-1 ${
              className || ""
            }`}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
            onBlur={onBlur}
          />
        
        </div>
        <FormErrors id={id} errors={errors}/>
      </div>
    );
  }
);
FormInput.displayName = "FormInput";
