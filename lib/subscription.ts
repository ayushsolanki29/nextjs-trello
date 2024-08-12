import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return false;
  }

  const orgSubscription = await db.orgSubscription.findUnique({
    where: { orgId },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCutermerId: true,
      stripePriceId: true,
    },
  });

  if (!orgSubscription) {
    console.log(`No subscription found for ${orgId}`);
    return false;
  }

  const isValid =
    orgSubscription.stripePriceId &&
    new Date(orgSubscription.stripeCurrentPeriodEnd!).getTime() + DAY_IN_MS > Date.now();

  if (!isValid) {
    console.log(
      `Could not find valid Stripe subscription for ${orgId} in ${orgSubscription.stripeCurrentPeriodEnd}`
    );
  }

  return !!isValid;
};
