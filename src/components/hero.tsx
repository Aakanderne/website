import { type HTMLAttributes } from 'react';
import Image from 'next/image';
import { cn } from '~/lib/utils';
import { typographyVariants } from '~/components/ui/typography';
import { Icons } from './icons';

type HeroProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  image: string;
  alt: string;
};

export function Hero({
  alt,
  className,
  image,
  ...props
}: HeroProps): JSX.Element {
  return (
    <section className={cn(className, 'relative h-[66vh] w-full')} {...props}>
      <div className="-z-10">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="relative flex size-full flex-col items-center justify-end space-y-10 bg-gradient-to-t from-black to-transparent pb-10 text-white">
        <Icons.Logo className="size-32" />
        <h1 className={cn(typographyVariants({ variant: 'h1' }))}>
          Velkommen til Åkanderne
        </h1>
        <p className={cn(typographyVariants())}>
          Hørnings lokale kulturforening
        </p>
      </div>
    </section>
  );
}
