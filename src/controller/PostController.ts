import { PrismaClient, Post as PrismaPost } from '@prisma/client';
import { Post } from '@/models/PostModel';

const prisma = new PrismaClient();

const exclude = <User, Key extends keyof User>(user: User, ...keys: Key[]): User => {
  for (let key of keys) {
    delete user[key];
  }
  return user;
};

const getAllPosts = async (): Promise<PrismaPost[]> => {
  const posts = prisma.post.findMany({
    include: {
      author: true,
    },
  });
  return (await posts).map((post) => {
    post.author = exclude(post.author, 'password');
    return post;
  });
};

const createPost = async (post: Post): Promise<PrismaPost> => {
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
