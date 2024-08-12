"use client";

import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent } from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { MoreHorizontal, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface BoardOptionsProps {
  id: string;
}
export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onSuccess: () => {
      toast.success("Board deleted successfully.");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onDeleteBoard = () => {
    execute({ id });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2 " variant={"transparent"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board Actions
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant={"ghost"}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant={"ghost"}
          disabled={isLoading}
          onClick={onDeleteBoard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-medium text-sm hover:bg-red-500 transition hover:text-white"
        >
          <Trash2 className="h-4 w-4 mx-2" /> Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
