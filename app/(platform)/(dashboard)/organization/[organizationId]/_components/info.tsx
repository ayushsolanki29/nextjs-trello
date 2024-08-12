"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";

interface InfoProps {
  isPro: boolean;
}
export const Info = ({ isPro }: InfoProps) => {
  const { organization, isLoaded } = useOrganization();
  if (!isLoaded) return <Info.skeleton />;

  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[50px] h-[50px] relative">
        <Image
          src={organization?.imageUrl!}
          fill
          alt="org"
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-lg">{organization?.name}</p>
        <div className="flex items-center text-xs text-muted-foreground ">
          <CreditCard className="h-3 w-3 mr-1" />
          {isPro ? "Pro" : "Free"}
        </div>
      </div>
    </div>
  );
};

Info.skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[50px] h-[50px] relative">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex items-center">
          <Skeleton className="h-3 w-3 mr-2" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </div>
    </div>
  );
};
