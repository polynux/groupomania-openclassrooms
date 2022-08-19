import { newUser, UserModel } from '@/controller/user';
import { User } from '@prisma/client';
import { Request, Response } from 'express';

export const signup = async (req: Request, res: Response) => {
  try {
    UserModel.parse(req.body);
    const user: User = req.body;
    const prismaUser = await newUser(user);
    return res.status(200).send(prismaUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};
