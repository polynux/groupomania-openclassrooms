import { Router } from 'express';
import { Post } from '@prisma/client';
import { getAllPosts } from '@/controller/PostController';

const posts = Router();

posts.get('/', async (req, res) => {
  try {
    const postList: Post[] = await getAllPosts();
    return res.status(200).send(postList);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default posts;
