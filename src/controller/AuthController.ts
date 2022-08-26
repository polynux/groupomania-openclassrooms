import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { promisify } from 'util';
import { config } from '..';
import { Token } from '@/models/TokenModel';

const saltRounds = 10;
const hashPromise = promisify(bcrypt.hash);

const hashPassword = (password: string) => {
  return hashPromise(password, saltRounds);
};

const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

const genToken = (id: number) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

const verifyToken = (token: string): Promise<Token> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (err?, decoded?: jwt.JwtPayload | string) => {
      if (err) {
        reject(err);
      } else if (decoded === undefined || typeof decoded === 'string' || decoded.id === undefined) {
        reject('Invalid token');
      } else {
        const decodedToken: Token = { id: decoded.id };
        resolve(decodedToken);
      }
    });
  });
};

export { hashPassword, comparePassword, genToken, verifyToken };
