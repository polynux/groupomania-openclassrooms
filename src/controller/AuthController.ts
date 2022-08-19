import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { promisify } from 'util';

dotenv.config();

const saltRounds = 10;
const hashPromise = promisify(bcrypt.hash);

const hashPassword = (password: string) => {
  return hashPromise(password, saltRounds);
};

const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export { hashPassword, comparePassword };
