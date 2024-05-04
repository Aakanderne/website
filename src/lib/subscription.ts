import { memberPlan, noPlan } from '~/config/subscriptions';
import { db } from '~/lib/db';
import type { UserSubscriptionPlan } from '~/types';

export async function getUserSubscriptionPlan(
  userId: string,
): Promise<UserSubscriptionPlan> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
      stripeSubscriptionId: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isMember = Boolean(
    user.stripePriceId &&
      user.stripeCurrentPeriodEnd &&
      user.stripeCurrentPeriodEnd.getTime() + 84_600_000 > Date.now(),
  );

  const plan = isMember ? memberPlan : noPlan;

  return {
    ...user,
    ...plan,
    isMember,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
  };
}
