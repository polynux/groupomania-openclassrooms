import Roles from "./roles";
import { NextFunction, Request, Response, Router } from 'express';
import { verifyToken } from "@/controller/AuthController";

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

export default users;