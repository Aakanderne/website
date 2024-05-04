'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { Icons } from '~/components/icons';
import { MobileNav } from '~/components/mobile-nav';
import { siteConfig } from '~/config/site';
import { cn } from '~/lib/utils';
import type { MainNavItem } from '~/types';

interface MainNavProps {
  items?: MainNavItem[];
}

export function MainNav({
  items,
  children,
}: PropsWithChildren<MainNavProps>): JSX.Element {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link className="hidden items-center space-x-2 md:flex" href="/">
        <Icons.Logo className="size-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items.map((item, index) => (
            <Link
              className={cn(
                'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- Safe to use template literal here
                item.href.startsWith(`/${segment}`)
                  ? 'text-foreground'
                  : 'text-foreground/60',
                item.disabled && 'cursor-not-allowed opacity-80',
              )}
              href={item.disabled ? '#' : item.href}
              // eslint-disable-next-line react/no-array-index-key -- Safe to use index as key here
              key={index}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => {
          setShowMobileMenu(!showMobileMenu);
        }}
        type="button"
      >
        {showMobileMenu ? <Icons.Close /> : <Icons.Logo />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items ? (
        <MobileNav items={items}>{children}</MobileNav>
      ) : null}
    </div>
  );
}
