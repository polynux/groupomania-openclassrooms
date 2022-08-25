import { deletePost } from '@/controller/PostController';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const userId = 1; // hardcoded for now, use userId from token
    const deletedPost = await deletePost(id, userId);
    if (deletedPost instanceof Error) {
      return res.status(403).send(deletedPost.message);
    }
    return res.status(200).send({ message: 'Post deleted' });
  } catch (error) {
    return res.status(500).send(error);
  }
};
