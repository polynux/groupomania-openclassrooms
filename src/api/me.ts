import { verifyToken } from "@/controller/AuthController";
import { getUserById } from "@/controller/UserController";
import { NextFunction, Request, Response, Router } from "express";

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

const me = Router();

me.use(checkAuth);

me.get("/", async (req: Request, res: Response) => {
  const user = await getUserById(req.userId);
  return res.status(200).send(user);
});

export default me;