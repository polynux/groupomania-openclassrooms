import { Post } from '@/models/PostModel';
import { Post as PrismaPost } from '@prisma/client';
import { createPost } from '@/controller/PostController';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    req.body.authorId = req.userId;
    req.body.image = req.file?.filename;
    const post: Post = Post.parse(req.body);
    const newPost: PrismaPost = await createPost(post);

    return res.status(200).send(newPost);
  } catch (error) {
    console.log(error);

    return res.status(500).send(error);
  }
};
