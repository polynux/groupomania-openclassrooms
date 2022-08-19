import { PrismaClient, User } from '@prisma/client';
import * as z from 'zod';

const UserModel = z.object({
  email: z.string().email(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  role: z.string(),
});

const UserLoginModel = z.object({
  email: z.string().email(),
  password: z.string(),
});

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

export { getUser, newUser, UserModel, UserLoginModel };
