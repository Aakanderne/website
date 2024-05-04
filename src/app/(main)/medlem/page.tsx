import { redirect } from 'next/navigation';
import { BillingForm } from '~/components/billing-form';
import { getCurrentUser } from '~/lib/session';
import { stripe } from '~/lib/stripe';
import { getUserSubscriptionPlan } from '~/lib/subscription';

export default async function MemberPage(): Promise<JSX.Element> {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  let isCanceled = false;
  if (subscriptionPlan.isMember && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId,
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return (
    <main className="container flex w-full flex-1 flex-col overflow-hidden">
      <BillingForm
        subscriptionPlan={{ ...subscriptionPlan, isCanceled }}
        className="mt-6"
      />
    </main>
  );
}
