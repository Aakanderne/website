import type { Metadata } from 'next';
import Link from 'next/link';
import { Icons } from '~/components/icons';
import { buttonVariants } from '~/components/ui/button';
import { UserAuthForm } from '~/components/user-auth-form';
import { cn } from '~/lib/utils';

export const metadata: Metadata = {
  title: 'Log ind',
  description: 'Log ind på din konto',
};

export default function LoginPage(): JSX.Element {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8',
        )}
        href="/"
      >
        <>
          <Icons.ChevronLeft className="mr-2 size-4" />
          Tilbage
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.Logo className="mx-auto size-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Velkommen tilbage
          </h1>
          <p className="text-sm text-muted-foreground">
            Skriv din email for at logge ind
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            className="hover:text-brand underline underline-offset-4"
            href="/register"
          >
            Har du ikke en konto? Opret en her
          </Link>
        </p>
      </div>
    </div>
  );
}
