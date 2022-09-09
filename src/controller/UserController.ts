import { PrismaClient } from '@prisma/client';
import { User } from '@/models/UserModel';
import { exclude } from '@/lib/utils';

const prisma = new PrismaClient();

const getUser = (email: string) => {
  const user = prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (user) {
    return exclude(user, 'password');
  }
};

const isUserExist = (email: string) =>
  prisma.user
    .findUnique({
      where: {
        email,
      },
    })
    .then((user) => {
      if (user) {
        return true;
      }
      return false;
    })
    .catch((error) => {
      throw error;
    });

const newUser = async (user: User) => {
  const userExist: Boolean = await isUserExist(user.email);
  if (userExist) {
    return null;
  }
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      role: 'USER',
    },
  });

  return newUser;
};

export { getUser, newUser, isUserExist, getUserById };
