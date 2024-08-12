import { Tooltip, TooltipContent } from "@radix-ui/react-tooltip";
import { TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface HintProps {
  children: React.ReactNode;
  description: string;
  side?: "left" | "right" | "top" | "bottom";
  sideoffset?: number;
}
export const Hint = ({
  children,
  description,
  side = "bottom",
  sideoffset = 0,
}: HintProps) => {
  return (
    <TooltipProvider >
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          sideOffset={sideoffset}
          side={side}
          className="text-xs max-w-[220px] break-words shadow p-2 rounded"
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
