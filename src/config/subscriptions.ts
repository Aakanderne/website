import type { SubscriptionPlan } from '~/types';
import { env } from '~/env.mjs';

export const memberPlan: SubscriptionPlan = {
  name: 'Medlem',
  description:
    'Medlemskab af Åkanderne. Du kan tilmelde dig alle vores arrangementer og hold.',
  stripePriceId: env.STRIPE_MEMBER_PRODUCT_PRICE_ID,
};

export const noPlan: SubscriptionPlan = {
  name: 'Ingen',
  description: 'Ingen medlemskab',
  stripePriceId: '',
};
