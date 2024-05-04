import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { memberPlan } from '~/config/subscriptions';
import { authOptions } from '~/lib/auth';
import { stripe } from '~/lib/stripe';
import { getUserSubscriptionPlan } from '~/lib/subscription';
import { absoluteUrl } from '~/lib/utils';

const billingUrl = absoluteUrl('/medlem');

export async function GET(): Promise<Response> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user.email) {
      return new Response(null, { status: 403 });
    }
    const subscriptionPlan = await getUserSubscriptionPlan(session.user.id);

    if (subscriptionPlan.isMember) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId ?? '',
        return_url: billingUrl,
      });
      return new Response(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: session.user.email,
      line_items: [{ price: memberPlan.stripePriceId, quantity: 1 }],
      metadata: { userId: session.user.id },
    });
    return new Response(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: error.issues }), {
        status: 422,
      });
    }
    return new Response(null, { status: 500 });
  }
}
