import type { PropsWithChildren } from 'react';
import { Header } from '~/components/header';

export default function MainLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <>
      <Header navItems={[{ href: '/medlem', title: 'Medlemskab' }]} />
      {children}
    </>
  );
}
