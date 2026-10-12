import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || 'dummy-github-id',
      clientSecret: process.env.GITHUB_SECRET || 'dummy-github-secret',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'dummy-google-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy-google-secret',
    }),
    CredentialsProvider({
      name: 'Demo / Fast Access',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'student@ubit.uok.edu.pk' },
        role: { label: 'Role', type: 'text' },
        name: { label: 'Name', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        const role = credentials.role === 'judge' ? 'judge' : 'participant';
        return {
          id: Buffer.from(credentials.email).toString('base64'),
          name: credentials.name || (role === 'judge' ? 'Dr. Judge (UBIT Jury)' : 'Syed Ali (Participant)'),
          email: credentials.email,
          role: role,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || (user.email?.includes('judge') ? 'judge' : 'participant');
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role || 'participant';
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
  secret: process.env.NEXTAUTH_SECRET || 'codeconnect-super-secret-key-2026',
};
