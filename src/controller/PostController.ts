import { PrismaClient } from '@prisma/client';
import { Post } from '@/models/PostModel';

const prisma = new PrismaClient();

const getAllPosts = () => prisma.post.findMany();

const createPost = async (post: Post) => {
  const newPost = await prisma.post.create({
    data: {
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      image: post.image,
    },
  });

  return newPost;
};

export { getAllPosts, createPost };
