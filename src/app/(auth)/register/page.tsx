import Link from 'next/link';
import { Icons } from '~/components/icons';
import { buttonVariants } from '~/components/ui/button';
import { UserAuthForm } from '~/components/user-auth-form';
import { cn } from '~/lib/utils';

export default function RegisterPage(): JSX.Element {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8',
        )}
        href="/login"
      >
        Log ind
      </Link>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.Logo className="mx-auto size-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Opret en konto
            </h1>
            <p className="text-sm text-muted-foreground">
              Skriv din email for at komme i gang
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
