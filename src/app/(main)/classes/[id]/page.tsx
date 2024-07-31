import Image from 'next/image';
import type Stripe from 'stripe';
import { typographyVariants } from '~/components/ui/typography';
import { stripe } from '~/lib/stripe';
import { cn } from '~/lib/utils';

export default async function ClassPage({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  const { id } = params;
  const product = await stripe.products.retrieve(id, {
    expand: ['default_price'],
  });

  const priceObject = product.default_price as Stripe.Price;
  const formatter = new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: priceObject.currency,
  });

  const articleHeading = cn(
    typographyVariants({ variant: 'h4' }),
    'font-semibold',
  );

  // eslint-disable-next-line no-console -- Debugging
  console.log(JSON.stringify(product, null, 2));

  return (
    <>
      {product.metadata.image ? (
        <section className="mx-auto w-full max-w-4xl px-5 py-10">
          <Image
            src={product.metadata.image}
            width={900}
            height={450}
            className="rounded-lg object-cover"
            alt={product.name}
          />
        </section>
      ) : null}
      <section className="mx-auto w-full max-w-4xl space-y-10 px-5 py-10">
        <h2 className={cn(typographyVariants({ variant: 'h2' }))}>
          {product.name}
        </h2>
        <p className={cn(typographyVariants())}>{product.description}</p>
        <article className="space-y-2">
          <h4 className={articleHeading}>Alder</h4>
          <p className={cn(typographyVariants())}>{product.metadata.age}</p>
        </article>
        <article className="space-y-2">
          <h4 className={articleHeading}>Pris</h4>
          <p className={cn(typographyVariants())}>
            {formatter.format((priceObject.unit_amount ?? 100) / 100)}
          </p>
        </article>
        <article className="space-y-2">
          <h4 className={articleHeading}>Tid</h4>
          <p className={cn(typographyVariants())}>
            {product.metadata.time ?? 'Efter aftale'}
          </p>
        </article>
        <article className="space-y-2">
          <h4 className={articleHeading}>Sted</h4>
          <p className={cn(typographyVariants())}>{product.metadata.place}</p>
        </article>
      </section>
    </>
  );
}
