import type { User } from '@prisma/client';

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export type MainNavItem = NavItem;

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
}

export interface SubscriptionPlan {
  name: string;
  description: string;
  stripePriceId: string;
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, 'stripeCustomerId' | 'stripeSubscriptionId'> & {
    stripeCurrentPeriodEnd?: number;
    isMember: boolean;
  };
