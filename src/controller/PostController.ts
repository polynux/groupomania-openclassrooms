import { PrismaClient, Post as PrismaPost } from '@prisma/client';
import { Post } from '@/models/PostModel';

const prisma = new PrismaClient();

const exclude = <User, Key extends keyof User>(user: User, ...keys: Key[]): User => {
  for (let key of keys) {
    delete user[key];
  }
  return user;
};

const getPostById = async (id: number): Promise<PrismaPost | null> => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return post;
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

const editPost = async (post: Post, userId: number): Promise<PrismaPost | null | Error> => {
  if (post.id === undefined) {
    return new Error('Post id is undefined');
  }
  const originalPost = await getPostById(post.id);
  if (originalPost === null) {
    return null;
  }
  if (originalPost.authorId !== userId) {
    return new Error('User is not the author of this post');
  }
  const editedPost = await prisma.post.update({
    where: {
      id: post.id,
    },
    data: {
      title: post.title,
      content: post.content,
      image: post.image,
    },
  });

  if (!editedPost) {
    return null;
  }

  return editedPost;
};

export { getAllPosts, createPost, editPost };
