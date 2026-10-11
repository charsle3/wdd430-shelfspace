import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';
import { getUserByName } from '@/lib/connect'; // your DB query function

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({ name: z.string().min(1), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const { name, password } = parsed.data;
        const user = await getUserByName(name);
        if (!user || user.length === 0) return null;

        const passwordsMatch = await bcrypt.compare(password, user[0].pass_hash);
        if (passwordsMatch) {
            return {
                id: String(user[0].id),
                name: user[0].name,
            };
        }
        return null;
      },
    }),
  ],
});