import { Account } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: Account.accessToken;
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: Account.accessToken;
  }
}
