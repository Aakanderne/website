'use client';

import Link from 'next/link';
import type { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { UserAvatar } from '~/components/user-avatar';

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'name' | 'image' | 'email'> & { isAdmin: boolean };
}

export function UserAccountNav({ user }: UserAccountNavProps): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="size-8"
          user={{ name: user.name ?? null, image: user.image ?? null }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name ? <p className="font-medium">{user.name}</p> : null}
            {user.email ? (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            ) : null}
          </div>
        </div>
        <DropdownMenuSeparator />
        {user.isAdmin ? (
          <DropdownMenuItem asChild>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem asChild>
          <Link href="/dashboard/billing">Billing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            void signOut({
              callbackUrl: `${window.location.origin}/login`,
            });
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
