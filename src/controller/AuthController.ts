import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { promisify } from 'util';
import { config } from '..';
import { PrismaClient } from '@prisma/client';
import ms from 'ms';

const prisma = new PrismaClient();

const saltRounds = 10;
const hashPromise = promisify(bcrypt.hash);

const hashPassword = (password: string) => {
  return hashPromise(password, saltRounds);
};

const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

const genToken = (userId: number) => {
  const newToken = jwt.sign({ id: userId }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });

  return prisma.token.create({
    data: {
      userId,
      token: newToken,
      expiresAt: new Date(Date.now() + ms(config.JWT_EXPIRES_IN)), // 30 days
    },
  });
};

const verifyToken = (token: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, async (err?, decoded?: jwt.JwtPayload | string) => {
      if (err) {
        reject('Unkown error');
      } else if (decoded === undefined || typeof decoded === 'string' || decoded.id === undefined) {
        reject('Invalid token');
      } else {
        const prismaToken = await prisma.token.findUnique({
          where: { token },
        });
        if (prismaToken === null) {
          throw 'Token not found';
        }
        const decodedToken: number = decoded.id;
        resolve(decodedToken);
      }
    });
  });
};

const deleteToken = (token: string) => {
  return prisma.token.delete({
    where: { token },
  });
};

const deleteExpiredTokens = () => {
  return prisma.token.deleteMany({
    where: {
      expiresAt: {
        lte: new Date(Date.now()),
      },
    },
  });
};

export { hashPassword, comparePassword, genToken, verifyToken, deleteToken, deleteExpiredTokens };
