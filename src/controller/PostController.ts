import { PrismaClient, Post as PrismaPost, Like } from '@prisma/client';
import { Post } from '@/models/PostModel';
import { exclude } from '@/lib/utils';
import { getUserById } from './UserController';

const prisma = new PrismaClient();

const getPostById = async (id: number): Promise<PrismaPost | null> => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      likedBy: true,
    },
  });
  return post;
};

const getAllPosts = async (): Promise<PrismaPost[]> => {
  const posts = prisma.post.findMany({
    include: {
      author: true,
      likedBy: true,
    },
  });
  return (await posts).map((post) => {
    post.author = exclude(post.author, 'password');
    post.image = post.image ? `/uploads/${post.image}` : null;
    return post;
  });
};

const createPost = async (post: Post): Promise<PrismaPost> => {
  const newPost = await prisma.post.create({
    data: {
      content: post.content,
      authorId: post.authorId,
      image: post.image,
    },
  });
  newPost.image = newPost.image ? `/uploads/${newPost.image}` : null;

  return newPost;
};

const editPost = async (post: Post): Promise<PrismaPost | null | Error> => {
  if (post.id === undefined) {
    return new Error('Post id is undefined');
  }
  const originalPost = await getPostById(post.id);
  if (originalPost === null) {
    return null;
  }
  const user = await getUserById(post.authorId);
  if (!user) {
    return new Error('User not found');
  }
  if (originalPost.authorId !== post.authorId && user.role === 'USER') {
    return new Error('User is not the author of this post');
  }
  const editedPost = await prisma.post.update({
    where: {
      id: post.id,
    },
    data: {
      content: post.content,
      image: post.image,
    },
  });

  if (!editedPost) {
    return null;
  }

  editedPost.image = editedPost.image ? `/uploads/${editedPost.image}` : null;

  return editedPost;
};

const deletePost = async (id: number, userId: number): Promise<PrismaPost | Error> => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  if (post === null) {
    return new Error('Post not found');
  }
  const user = await getUserById(userId);
  if (!user) {
    return new Error('User not found');
  }
  if (post.authorId !== userId && user.role === 'USER') {
    return new Error('User is not the author of this post');
  }
  return prisma.post.delete({
    where: {
      id,
    },
  });
};

const unlikePost = async (postId: number, userId: number): Promise<Like | Error> => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      likedBy: true,
    },
  });
  if (post === null) {
    return new Error('Post not found');
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      likes: true,
    },
  });
  if (user === null) {
    return new Error('User not found');
  }
  const like = post.likedBy.find((likes) => likes.postId === postId && likes.userId === userId);
  if (like === undefined) {
    return new Error('Post not liked');
  }

  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likes: {
        decrement: 1,
      },
    },
  });

  return prisma.like.delete({
    where: {
      id: like.id,
    },
  });
};

const likePost = async (id: number, userId: number): Promise<PrismaPost | Error> => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      likedBy: true,
    },
  });
  if (post === null) {
    return new Error('Post not found');
  }
  if (post.authorId === userId) {
    return new Error('User cannot like their own post');
  }
  if (post.likedBy.some((like) => like.userId === userId)) {
    return new Error('Post already liked');
  }
  const newLike = await prisma.like.create({
    data: {
      post: {
        connect: {
          id,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return prisma.post.update({
    where: {
      id,
    },
    data: {
      likedBy: {
        connect: {
          id: newLike.id,
        },
      },
      likes: {
        increment: 1,
      },
    },
  });
};

export { getAllPosts, createPost, editPost, getPostById, deletePost, likePost, unlikePost };
