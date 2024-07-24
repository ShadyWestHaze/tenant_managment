import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      ismanager: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    ismanager: boolean;
  }

  interface JWT {
    id: string;
    ismanager: boolean;
  }
}
