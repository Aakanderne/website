import { getCurrentUser } from '~/lib/session';
import type { MainNavItem } from '~/types';
import { MainNav } from './main-nav';
import { UserAccountNav } from './user-account-nav';

interface HeaderProps {
  navItems?: MainNavItem[];
}

export async function Header({ navItems }: HeaderProps): Promise<JSX.Element> {
  const user = await getCurrentUser();
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <MainNav items={navItems} />
        <UserAccountNav
          user={{
            email: user?.email,
            image: user?.image,
            name: user?.name,
            isAdmin: user?.email?.endsWith('@aakanderne.dk') ?? false,
          }}
        />
      </div>
    </header>
  );
}
