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
        username: { label: "Username:", type: "text", placeholder: "your username" },
        password: { label: "Password:", type: "password", placeholder: "your password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.log('No credentials provided');
          return null;
        }

        const { username, password } = credentials;

        try {
          const res = await query('SELECT * FROM users WHERE username = $1', [username]);
          const user = res.rows[0];

          if (!user) {
            console.log('No user found with that username');
            return null;
          }


          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            console.log('Password match');
            return { id: user.id, name: user.username, email: user.email };
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
};

export default options;
