'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import type { HTMLAttributes } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { Icons } from '~/components/icons';
import { buttonVariants } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { userAuthSchema } from '~/lib/validations/auth';

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({
  className,
  ...props
}: UserAuthFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  async function onSubmit(data: FormData): Promise<void> {
    setIsLoading(true);

    const signInResult = await signIn('email', {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams.get('from') ?? '/',
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      toast.error('Noget gik galt.', {
        description: 'Det mislykkedes at logge ind. Prøv igen.',
      });
      return;
    }

    toast.success('Tjek din email', {
      description:
        'Vi har sendt dig et link til at logge ind. Husk også at tjekke dit spamfilter.',
    });
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises -- Not misused */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading}
              id="email"
              placeholder="name@example.com"
              type="email"
              {...register('email')}
            />
            {errors.email ? (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            ) : null}
          </div>
          <button
            className={cn(buttonVariants())}
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <Icons.Spinner className="mr-2 size-4 animate-spin" />
            ) : null}
            Log ind med email
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Eller fortsæt med
          </span>
        </div>
      </div>
      <button
        className={cn(buttonVariants({ variant: 'outline' }))}
        disabled={isLoading || isGoogleLoading}
        onClick={() => {
          setIsGoogleLoading(true);
          void signIn('google');
        }}
        type="button"
      >
        {isGoogleLoading ? (
          <Icons.Spinner className="mr-2 size-4 animate-spin" />
        ) : (
          <Icons.Google className="mr-2 size-4" />
        )}{' '}
        Google
      </button>
      <button
        className={cn(buttonVariants({ variant: 'outline' }))}
        disabled={isLoading || isGoogleLoading}
        onClick={() => {
          setIsGoogleLoading(true);
          void signIn('google');
        }}
        type="button"
      >
        {isGoogleLoading ? (
          <Icons.Spinner className="mr-2 size-4 animate-spin" />
        ) : (
          <Icons.Instagram className="mr-2 size-4" />
        )}{' '}
        Instagram
      </button>
    </div>
  );
}
