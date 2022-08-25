import { z } from 'zod';
import { User } from './UserModel';
import { Post } from './PostModel';

interface Like {
  id?: number | undefined;
  userId: number;
  user: User;
  postId: number;
  post: Post;
}

const Like: z.ZodType<Like> = z.object({
  id: z.number().optional(),
  userId: z.number(),
  user: User,
  postId: z.number(),
  post: Post,
});

export { Like };
