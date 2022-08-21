import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const getUser = (email: string) => {
  const user = prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

const newUser = (user: User) => {
  const prismaUser = prisma.user.create({
    data: user,
  });

  return prismaUser;
};

export { getUser, newUser };
