import { Post } from '@/models/PostModel';
import { editPost } from '@/controller/PostController';
import { Post as PrismaPost } from '@prisma/client';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const post: Post = Post.parse(req.body);
    const userId = 1; // hardcoded for now, use userId from token
    const editedPost: PrismaPost | null | Error = await editPost(post, userId);
    if (editedPost === null) {
      return res.status(404).send('Post not found');
    }
    if (editedPost instanceof Error) {
      return res.status(403).send(editedPost.message);
    }

    return res.status(200).send(editedPost);
  } catch (error) {
    return res.status(500).send(error);
  }
};
