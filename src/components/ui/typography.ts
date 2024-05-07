import { cva } from 'class-variance-authority';

export const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold font-heading tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold font-heading tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold font-heading tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold font-heading tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      default: 'leading-7 [&:not(:first-child)]:mt-6',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      list: 'my-6 ml-6 list-disc [&>li]:mt-2',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold font-heading',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
    },
  },
});
