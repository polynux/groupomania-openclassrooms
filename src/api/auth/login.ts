import { getUser } from '@/controller/UserController';
import UserLoginModel from '@/models/UserLoginModel';
import { comparePassword } from '@/controller/AuthController';
import { Request, Response } from 'express';
import { User } from '@prisma/client';

const login = async (req: Request, res: Response) => {
  try {
    UserLoginModel.parse(req.body);
    const user: User | null = await getUser(req.body.email);
    if (user === null) {
      return res.status(401).send('User not found');
    }
    const isValid = await comparePassword(req.body.password, user.password);
    if (!isValid) {
      return res.status(401).send('Invalid password');
    }
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);

    return res.status(500).send(error);
  }
};

export default login;
