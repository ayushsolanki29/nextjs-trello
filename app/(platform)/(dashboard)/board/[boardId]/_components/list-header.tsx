"use client";

import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import ListOptions from "./list-options";

interface ListProps {
  data: List,
  onAddCard: () => void,
}
const ListHeader = ({ data,onAddCard }: ListProps) => {
  const [title, setTitle] = useState(data.title);
  const [editing, setEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };
  const disableEditing = () => {
    setEditing(false);
    formRef.current?.reset();
  };
  const { execute, fieldErrors } = useAction(updateList, {
    onSuccess: (list: List) => {
      toast.success(`Renamed to "${list.title}"`);
      setTitle(list.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    if (title === data.title) {
      return disableEditing();
    }
    execute({ title, id, boardId });
  };
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };
  useEventListener("keydown", onKeyDown);

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-center gap-x-2">
      {editing ? (
        <form className="flex-1 px-[2px]" ref={formRef} action={handleSubmit}>
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            errors={fieldErrors}
            defaultValue={data.title}
            id="title"
            placeholder="Enter List title.."
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <button type="submit" hidden></button>
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent cursor-pointer"
        >
            {/* show titile only first 10 characters */}
            {title.length > 25? `${title.slice(0, 25)}...` : title}
        </div>
      )}
      <ListOptions data={data} onAddCard={onAddCard}/>
    </div>
  );
};

export default ListHeader;
