"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { ACTION, ENTITY_TYPE, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { hasAvaliableCount, incrementAvaliableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";

const db = new PrismaClient();

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const canCreate = await hasAvaliableCount();
  const isPro = await checkSubscription();
  if (!canCreate && !isPro) {
    return {
      error:
        "You have reached your organization's limit of boards. Please delete some boards or upgrade your plan.",
    };
  }
  const { title, image } = data;
  const [imageId, imageThumbUrl, imageFullyUrl, imageLinkHTML, imageUserName] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullyUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: "Invalid image format. Failed to create",
    };
  }

  let board;
  try {
    board = await db.board.create({
      data: {
        orgId,
        title,
        imageId,
        imageThumbUrl,
        imageFullyUrl,
        imageLinkHTML,
        imageUserName,
      },
    });
    if (!isPro) {
      await incrementAvaliableCount();
    }
    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BORD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    console.error("Error creating board:", error);
    return {
      error: "Failure creating board.",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return {
    data: board,
  };
};

export const createBoard = createSafeAction(CreateBoard, handler);
