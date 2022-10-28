import { PrismaClient, Role } from '@prisma/client';
import { User } from '@/models/UserModel';
import { exclude } from '@/lib/utils';
import { comparePassword } from './AuthController';

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

export const changeUserRoles = async (id: number, role: Role) => {
  if (role === 'CREATOR') {
    return new Error('You cannot change user role to CREATOR');
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!currentUser) {
    return new Error('User not found');
  }
  if (currentUser.role === role) {
    throw new Error('User already has this role');
  }
  if (currentUser.role === 'CREATOR') {
    throw new Error('You cannot change role of user with CREATOR role');
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
  });

  if (!updatedUser) {
    return new Error('User not found');
  }
  return exclude(updatedUser, 'password');
};

export const changeUserInfo = async (
  id: number,
  userInfo: { firstName: string; lastName: string; password: string; newPassword?: string; confirmPassword: string }
) => {
  const currentUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!currentUser) {
    return new Error('User not found');
  }

  const isPasswordCorrect = await comparePassword(userInfo.password, currentUser.password);
  if (!isPasswordCorrect) {
    return new Error('Password is incorrect');
  }
  
  if (userInfo.newPassword) {
    if (userInfo.newPassword !== userInfo.confirmPassword) {
      return new Error('New password and confirm password do not match');
    }

    const isPasswordSame = await comparePassword(userInfo.password, currentUser.password);
    if (isPasswordSame) {
      return new Error('Password are the same');
    }

    if (userInfo.newPassword !== userInfo.confirmPassword) {
      return new Error('New password and confirm password are not the same');
    }
  }

  const data = {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
  };
  if (userInfo.newPassword) Object.setPrototypeOf(data, { password: userInfo.newPassword });

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  if (!updatedUser) {
    return new Error('User not found');
  }
  return exclude(updatedUser, 'password');
};

export { getUser, newUser, isUserExist, getUserById };
