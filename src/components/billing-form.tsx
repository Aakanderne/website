'use client';

import { useState } from 'react';
import type { FormEvent, HTMLAttributes } from 'react';
import { toast } from 'sonner';
import { cn, formatDate } from '~/lib/utils';
import type { UserSubscriptionPlan } from '~/types';
import { Icons } from './icons';
import { buttonVariants } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

interface BillingFormProps extends HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan & { isCanceled: boolean };
}

export function BillingForm({
  subscriptionPlan,
  className,
  ...props
}: BillingFormProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsLoading((prev) => !prev);
    const response = await fetch('/api/users/stripe');

    if (!response.ok) {
      toast.error('Der skete en fejl', {
        description: 'Prøv at genindlæse siden og prøv igen',
      });
      setIsLoading((prev) => !prev);
      return;
    }
    const session = (await response.json()) as { url: string };
    if (session.url) {
      window.location.href = session.url;
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises -- Not misused
    <form className={cn(className)} onSubmit={onSubmit} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Bliv medlem</CardTitle>
          <CardDescription>
            Bliv medlem og støt foreningens arbejde
          </CardDescription>
        </CardHeader>
        <CardContent>{subscriptionPlan.description}</CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <button
            className={cn(buttonVariants())}
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <Icons.Spinner className="mr-2 size-4 animate-spin" />
            ) : null}
            {subscriptionPlan.isMember ? 'Se detaljer' : 'Bliv medlem'}
          </button>
          {subscriptionPlan.isMember ? (
            <p className="rounded-full text-xs font-medium">
              {subscriptionPlan.isCanceled
                ? 'Dit medlemskab ophører den '
                : 'Dit medlemskab bliver fornyet den '}
              {formatDate(subscriptionPlan.stripeCurrentPeriodEnd ?? 0)}
            </p>
          ) : null}
        </CardFooter>
      </Card>
    </form>
  );
}
