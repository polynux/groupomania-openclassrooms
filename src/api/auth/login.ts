import { getUser, UserLoginModel } from '@/controller/user';
import { Request, Response } from 'express';
import { User } from '@prisma/client';

const login = async (req: Request, res: Response) => {
  try {
    UserLoginModel.parse(req.body);
    const user: User | null = await getUser(req.body.email);
    if (user === null) {
      return res.status(401).send('User not found');
    }
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default login;
