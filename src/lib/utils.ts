import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { env } from '~/env.mjs';

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString('da-DK', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function absoluteUrl(path: string): string {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}
