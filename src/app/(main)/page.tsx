import Image from 'next/image';
import Link from 'next/link';
import { About } from '~/components/about';
import { Hero } from '~/components/hero';
import { stripe } from '~/lib/stripe';

export default async function MainPage(): Promise<JSX.Element> {
  const allProducts = await stripe.products.list({
    active: true,
    expand: ['data.default_price'],
  });

  const classes = allProducts.data
    .filter((product) => !product.metadata.membershipSubscription)
    .sort((a, b) => a.name.localeCompare(b.name));

  // eslint-disable-next-line no-console -- Debugging
  console.log(JSON.stringify(classes, null, 2));

  return (
    <>
      <Hero alt="Åkanderne" image="/images/frontpage_hero_background.jpg" />
      <About />
      <section className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-4 px-5 py-10 sm:grid-cols-2">
        {classes.map((product) => (
          <Link key={product.id} href={`/classes/${product.id}`}>
            <article className="relative">
              {product.metadata.image ? (
                <div className="-z-10">
                  <Image
                    alt={product.name}
                    width={500}
                    height={400}
                    src={product.metadata.image}
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="absolute inset-0 flex flex-col items-center justify-end space-y-2 bg-gradient-to-t from-[#00000088] to-[#ffffff44] pb-2 text-white">
                <h2 className="text-2xl font-semibold">{product.name}</h2>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </>
  );
}
