import { type NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { default as EmailProvider } from 'next-auth/providers/email';
import { Resend } from 'resend';
import { env } from '~/env.mjs';
import { db } from './db';

const resend = new Resend(env.RESEND_API_KEY);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    EmailProvider({
      from: env.RESEND_FROM_EMAIL,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const user = await db.user.findUnique({
          where: { email: identifier },
          select: { emailVerified: true },
        });

        try {
          await resend.emails.send({
            from: provider.from,
            to: [identifier],
            subject: user?.emailVerified ? 'Log ind' : 'Bekræft din e-mail',
            text: user?.emailVerified
              ? `Log ind på siden her: ${url}`
              : `Bekræft din e-mail på siden her: ${url}`,
          });
        } catch (error) {
          throw new Error(`Failed to send email`);
        }
      },
    }),
  ],
  callbacks: {
    session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
};
