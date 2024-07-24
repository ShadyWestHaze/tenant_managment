import type { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { query } from '../../../lib/db'; 
import bcrypt from 'bcrypt';

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email:", type: "text", placeholder: "your email" },
        password: { label: "Password:", type: "password", placeholder: "your password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.log('No credentials provided');
          return null;
        }

        const { email, password } = credentials;

        try {
          const res = await query('SELECT id, name, email, password, ismanager FROM users WHERE email = $1', [email]);
          const user = res.rows[0];

          if (!user) {
            console.log('No user found with that email');
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            console.log('Password match');
            return { id: user.id, name: user.name, email: user.email, ismanager: user.ismanager };
          } else {
            console.log('Password does not match');
            return null;
          }
        } catch (error) {
          console.error('Error in authorize function:', error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          ismanager: token.ismanager as boolean,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.ismanager = user.ismanager;
      }
      return token;
    },
  },
};

export default options;
