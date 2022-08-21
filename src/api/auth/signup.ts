import { newUser } from '@/controller/UserController';
import UserModel from '@/models/UserModel';
import { hashPassword } from '@/controller/AuthController';
import { User } from '@prisma/client';
import { Request, Response } from 'express';

const signup = async (req: Request, res: Response) => {
  try {
    UserModel.parse(req.body);
    req.body.password = await hashPassword(req.body.password);
    const user: User = req.body;
    const prismaUser = await newUser(user);
    return res.status(200).send(prismaUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default signup;
