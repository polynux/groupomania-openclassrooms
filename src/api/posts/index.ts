import { NextFunction, Request, Response, Router } from 'express';
import getPosts from './getPosts';
import newPost from './newPost';
import putPost from './editPost';
import deletePost from './deletePost';
import likePost from './likePost';
import unlikePost from './unlikePost';
import { verifyToken } from '@/controller/AuthController';
import { upload } from '@/controller/FileController';

const posts = Router();

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

posts.use(checkAuth);

posts.get('/', getPosts);
posts.post('/new', upload.single('image'), newPost);
posts.put('/edit/:id', upload.single('image'), putPost);
posts.delete('/delete/:id', deletePost);
posts.put('/like/:id', likePost);
posts.put('/unlike/:id', unlikePost);

export default posts;
