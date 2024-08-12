"use client";
import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
interface BoardTitleFormProps {
  data: Board;
}
const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      setTitle(data.title);
      toast.success(`Board "${data.title}" updated successfully!`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const router = useRouter();
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const disableEditing = () => {
    setIsEditing(false);
  };
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title, id: data.id });
  };
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  const handleBack = () => {
    router.push(`/organization/${data.orgId}`);
  };
  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }
  return (
    <>
      <Button
      onClick={handleBack}
        variant={"transparent"}
        className="font-bold text-md h-auto w-auto p-1 px-2"
      >
        <ArrowLeft />
      </Button>
      <Button
        onClick={enableEditing}
        variant={"transparent"}
        className="font-bold text-md h-auto w-auto p-1 px-2"
      >
        {title}
      </Button>
    </>
  );
};

export default BoardTitleForm;
