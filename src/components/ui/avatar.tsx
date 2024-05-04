'use client';

import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';
import {
  Image as AvatarPrimitiveImage,
  Root as AvatarPrimitiveRoot,
  Fallback as AvatarPrimitiveFallback,
} from '@radix-ui/react-avatar';
import { cn } from '~/lib/utils';

export const Avatar = forwardRef<
  ElementRef<typeof AvatarPrimitiveRoot>,
  ComponentPropsWithoutRef<typeof AvatarPrimitiveRoot>
>(({ className, ...props }, ref) => (
  <AvatarPrimitiveRoot
    ref={ref}
    className={cn(
      'relative flex size-10 shrink-0 overflow-hidden rounded-full',
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitiveRoot.displayName;

export const AvatarImage = forwardRef<
  ElementRef<typeof AvatarPrimitiveImage>,
  ComponentPropsWithoutRef<typeof AvatarPrimitiveImage>
>(({ className, ...props }, ref) => (
  <AvatarPrimitiveImage
    ref={ref}
    className={cn('aspect-square size-full', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitiveImage.displayName;

export const AvatarFallback = forwardRef<
  ElementRef<typeof AvatarPrimitiveFallback>,
  ComponentPropsWithoutRef<typeof AvatarPrimitiveFallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitiveFallback
    ref={ref}
    className={cn(
      'flex size-full items-center justify-center rounded-full bg-muted',
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitiveFallback.displayName;
