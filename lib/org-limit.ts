import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { MAX_FREE_BOARDS } from "@/constants/boards";

export const incrementAvaliableCount = async () => {
  const { orgId } = await auth();
  if (!orgId) {
    throw new Error(`Unauthorized access`);
  }
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });
  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: {
        count: orgLimit.count + 1,
      },
    });
  } else {
    await db.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};
export const decreaseAvaliableCount = async () => {
  const { orgId } = await auth();
  if (!orgId) {
    throw new Error(`Unauthorized access`);
  }
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });
  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: {
        count: orgLimit.count > 0 ? orgLimit.count - 1 : 0,
      },
    });
  } else {
    await db.orgLimit.create({
      data: {
        orgId,
        count: 1,
      },
    });
  }
};

export const hasAvaliableCount = async () => {
  const { orgId } = await auth();
  if (!orgId) {
    throw new Error(`Unauthorized access`);
  }
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });
  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true;
  } else {
    return false;
  }
};

export const getAvaliableCount = async () => {
  const { orgId } = await auth();
  if (!orgId) {
    return 0;
  }
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });
  if (orgLimit) {
    return orgLimit.count;
  } else {
    return 0;
  }
};
