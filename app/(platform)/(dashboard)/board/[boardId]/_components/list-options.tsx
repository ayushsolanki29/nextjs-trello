"use client";
import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/form/form-button";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { Copy, MoreHorizontal, Plus, Trash2, X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface OptionsProps {
  data: List;
  onAddCard: () => void;
}
const ListOptions = ({ data, onAddCard }: OptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted successfully.`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copied successfully.`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    executeDelete({ id, boardId });
  };
  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    executeCopy({ id, boardId });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant={"ghost"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="px-0 pt-3 pb-3">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List Actions
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant={"ghost"}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          variant={"ghost"}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-medium text-sm transition"
        >
          <Plus className="h-4 w-4 mx-1" />
          Add card...
        </Button>
        <form action={onCopy}>
          <input type="hidden" name="id" value={data.id} id="id" />
          <input
            type="hidden"
            name="boardId"
            value={data.boardId}
            id="boardId"
          />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-medium text-sm transition"
          >
            <Copy className="h-4 w-4 mx-1" /> Copy List...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input type="hidden" name="id" value={data.id} id="id" />
          <input
            type="hidden"
            name="boardId"
            value={data.boardId}
            id="boardId"
          />

          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 hover:bg-red-500 hover:text-white justify-start font-medium text-sm transition"
          >
            <Trash2 className="h-4 w-4 mx-1" /> Delete this List...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
