import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    GitHub({
      profile(profile) {
        return {
          id: profile.id.toString(), // Konwersja id na string
          email: profile.email,
          name: profile.name,
          role:
            profile.email === "jakub.tomczyk.2005@gmail.com" ? "ADMIN" : "USER",
          image: profile.avatar_url,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role =
          user.email === "jakub.tomczyk.2005@gmail.com" ? "ADMIN" : "USER";
      }
      return token;
    },
    session({ session, token }) {
      if (!token.sub) return session;
      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as "USER" | "ADMIN";
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
