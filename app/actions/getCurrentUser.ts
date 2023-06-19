import { getServerSession } from 'next-auth/next';
import prisma from '@/app/libs/prismadb';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function getSession() {
  const result = await getServerSession(authOptions);
  return result;
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma!.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });
    if (!currentUser) {
      return null;
    }
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    return null;
  }
}
