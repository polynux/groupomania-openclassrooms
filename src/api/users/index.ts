import Roles from "./roles";
import { NextFunction, Request, Response, Router } from 'express';
import { verifyToken } from "@/controller/AuthController";
import { changeUserInfo } from "@/controller/UserController";

const users = Router();

const getToken = (req: Request): string | undefined => {
  const token: string | undefined = req.headers.authorization?.substring(7); // remove 'Bearer ' from token
  return token;
};

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = getToken(req);
  if (token === undefined) {
    return res.status(401).send({ error: 'No token provided' });
  }
  return verifyToken(token)
    .then((decodedToken: number) => {
      req.userId = decodedToken;
      next();
    })
    .catch((error) => {
      return res.status(401).send({ error });
    });
};

users.use(checkAuth);

users.post('/:id/roles', Roles);

users.put('/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const token = getToken(req);
  if (token === undefined) {
    return res.status(401).send({ error: 'No token provided' });
  }
  if (req.userId !== userId) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  return changeUserInfo(userId, req.body)
    .then((data) => {
      if (data instanceof Error) {
        return res.status(400).send({ error: data.message });
      }
      return res.status(200).send(data);
    })
    .catch((error) => {
      return res.status(400).send({ error: error.message });
    });
});


export default users;