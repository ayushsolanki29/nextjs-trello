import Image from "next/image";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";

const localFontFace = localFont({
  src: "../public/font/font.woff2",
});

export const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="hover:opacity-75 select-none translate items-center gap-x-2 justify-center hidden md:flex">
        <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
        <p className={cn("text-lg text-neutral-700", localFontFace.className)}>Taskify </p>
      </div>
    </Link>
  );
};
