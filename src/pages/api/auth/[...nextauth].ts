import NextAuth, { type NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import prisma from '../../../lib/prismadb';

import { loginSchema } from '../../../utils';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {},
      authorize: async credentials => {
        const creds = loginSchema.parse(credentials);
        const user = await prisma.user.findFirst({
          where: { email: creds.email },
        });
        if (!user || !user.password) throw new Error('No user found!');
        const isValidPassword = await compare(creds.password, user.password);
        if (!isValidPassword) throw new Error('Invalid password!');

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: null,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
