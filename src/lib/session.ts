import { type User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '~/lib/auth';

export async function getCurrentUser(): Promise<
  undefined | (User & { id: string })
> {
  const session = await getServerSession(authOptions);

  return session?.user;
}
