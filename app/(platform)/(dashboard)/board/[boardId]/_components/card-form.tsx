"use client";
import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/form/form-button";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, forwardRef, KeyboardEventHandler, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface Props {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}
export const CardForm = forwardRef<HTMLTextAreaElement, Props>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);
    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (card) => {
        toast.success(`Card "${card.title}" created successfully!`);
        formRef.current?.reset();
        disableEditing();
      },
      onError: (error) => {
        toast.error(error);
      },
    });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        disableEditing();
      }
    };
    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);
    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };
    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = formData.get("boardId") as string;
      execute({ title, listId, boardId });
    };
    if (isEditing) {
      return (
        <form
          ref={formRef}
          className="m-1 py-0.5 px-1 space-y-4"
          action={onSubmit}
        >
          <FormTextarea
            required
            id="title"
            onKeyDown={onTextareaKeyDown}
            errors={fieldErrors}
            ref={ref}
            placeholder="Enter a title for this card..."
          />
          <input hidden id="listId" name="listId" value={listId} />
          <input hidden id="boardId" name="boardId" value={params.boardId} />
          <div className="flex items-center gap-x-1">
            <FormSubmit variant={"primary"}>Add Card</FormSubmit>
            <Button onClick={disableEditing} size={"sm"} variant={"ghost"}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }
    return (
      <div className="pt-2 px-2 ">
        <Button
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          variant={"ghost"}
          size={"sm"}
          onClick={enableEditing}
        >
          <Plus className="h-4 w-4 mr-2" /> Add a Card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
