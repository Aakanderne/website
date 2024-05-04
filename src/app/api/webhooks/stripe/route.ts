import { headers } from 'next/headers';
import type Stripe from 'stripe';
import { env } from '~/env.mjs';
import { stripe } from '~/lib/stripe';
import { db } from '~/lib/db';

export async function POST(req: Request): Promise<Response> {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature ?? '',
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    return new Response(`webhook error: ${(error as Error).message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    await db.user.update({
      where: { id: session.metadata?.userId },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      },
    });
  }

  if (event.type === 'invoice.payment_succeeded') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );
    await db.user.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      },
    });
  }

  return new Response(null, { status: 200 });
}
