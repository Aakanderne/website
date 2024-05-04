'use client';

import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  type HTMLAttributes,
} from 'react';
import {
  CheckboxItem as DropdownMenuPrimitiveCheckboxItem,
  ItemIndicator as DropdownMenuPrimitiveItemIndicator,
  RadioItem as DropdownMenuPrimitiveRadioItem,
  Label as DropdownMenuPrimitiveLabel,
  Separator as DropdownMenuPrimitiveSeparator,
  SubContent as DropdownMenuPrimitiveSubContent,
  RadioGroup as DropdownMenuPrimitiveRadioGroup,
  SubTrigger as DropdownMenuPrimitiveSubTrigger,
  Root as DropdownMenuPrimitiveRoot,
  Trigger as DropdownMenuPrimitiveTrigger,
  Content as DropdownMenuPrimitiveContent,
  Group as DropdownMenuPrimitiveGroup,
  Portal as DropdownMenuPrimitivePortal,
  Sub as DropdownMenuPrimitiveSub,
  Item as DropdownMenuPrimitiveItem,
} from '@radix-ui/react-dropdown-menu';
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from '@radix-ui/react-icons';
import { cn } from '~/lib/utils';

export const DropdownMenu = DropdownMenuPrimitiveRoot;

export const DropdownMenuTrigger = DropdownMenuPrimitiveTrigger;

export const DropdownMenuGroup = DropdownMenuPrimitiveGroup;

export const DropdownMenuPortal = DropdownMenuPrimitivePortal;

export const DropdownMenuSub = DropdownMenuPrimitiveSub;

export const DropdownMenuRadioGroup = DropdownMenuPrimitiveRadioGroup;

export const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof DropdownMenuPrimitiveSubTrigger>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitiveSubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitiveSubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto size-4" />
  </DropdownMenuPrimitiveSubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitiveSubTrigger.displayName;

export const DropdownMenuSubContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitiveSubContent>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitiveSubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitiveSubContent
    ref={ref}
    className={cn(
      'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitiveSubContent.displayName;

export const DropdownMenuContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitiveContent>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitiveContent>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitivePortal>
    <DropdownMenuPrimitiveContent
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitivePortal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitiveContent.displayName;

export const DropdownMenuItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitiveItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitiveItem> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitiveItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitiveItem.displayName;

export const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitiveCheckboxItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitiveCheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitiveCheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuPrimitiveItemIndicator>
        <CheckIcon className="size-4" />
      </DropdownMenuPrimitiveItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitiveCheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitiveCheckboxItem.displayName;

export const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitiveRadioItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitiveRadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitiveRadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuPrimitiveItemIndicator>
        <DotFilledIcon className="size-4 fill-current" />
      </DropdownMenuPrimitiveItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitiveRadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitiveRadioItem.displayName;

export const DropdownMenuLabel = forwardRef<
  ElementRef<typeof DropdownMenuPrimitiveLabel>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitiveLabel> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitiveLabel
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitiveLabel.displayName;

export const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof DropdownMenuPrimitiveSeparator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitiveSeparator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitiveSeparator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitiveSeparator.displayName;

export function DropdownMenuShortcut({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>): JSX.Element {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  );
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';
