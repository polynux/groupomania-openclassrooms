import { unlikePost } from '@/controller/PostController';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    const likedPost = await unlikePost(postId, req.userId);
    if (likedPost instanceof Error) {
      return res.status(403).send(likedPost.message);
    }
    return res.status(200).send({ message: 'Post unliked' });
  } catch (error) {
    console.log(error);

    return res.status(500).send(error);
  }
};
