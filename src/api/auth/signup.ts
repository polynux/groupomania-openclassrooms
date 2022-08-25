import { newUser } from '@/controller/UserController';
import { User } from '@/models/UserModel';
import { hashPassword } from '@/controller/AuthController';
import { Request, Response } from 'express';
import { User as PrismaUser } from '@prisma/client';

const signup = async (req: Request, res: Response) => {
  try {
    req.body.password = await hashPassword(req.body.password);
    const user: User = User.parse({ ...req.body });
    const prismaUser: PrismaUser | null = await newUser(user);
    if (!prismaUser) {
      return res.status(400).send({ error: 'User already exists' });
    }

    return res.status(200).send(prismaUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default signup;
