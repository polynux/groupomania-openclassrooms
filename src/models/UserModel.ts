import { z } from 'zod';
import { Post } from './PostModel';
import { Like } from './LikeModel';

interface User {
  id?: number | undefined;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string | undefined;
  posts?: Post[] | undefined;
  likes?: Like[] | undefined;
}

const User: z.ZodType<User> = z.object({
  id: z.number().optional(),
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.string().optional(),
  posts: z.array(Post).optional(),
  likes: z.array(Like).optional(),
});

export { User };
