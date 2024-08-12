"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReternType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReternType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title, boardId } = data;
  let list;
  try {
    const board = await db.board.findUnique({
      where: { id: boardId, orgId },
    });
    if (!board) {
      return {
        error: "Board not found",
      };
    }
    const existingList = await db.list.findFirst({
      where: { boardId: boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const newOrder = existingList ? existingList.order + 1 : 1;
    list = await db.list.create({
      data: { title, boardId, order: newOrder },
    });
    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to cretae.",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    data: list,
  };
};

export const cretaeList = createSafeAction(CreateList, handler);
