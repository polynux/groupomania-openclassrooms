import { likePost } from '@/controller/PostController';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const likedPost = await likePost(id, req.userId);
    if (likedPost instanceof Error) {
      return res.status(403).send({error: likedPost.message});
    }
    return res.status(200).send({ message: 'Post liked' });
  } catch (error) {
    return res.status(500).send(error);
  }
};
