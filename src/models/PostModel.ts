import { z } from 'zod';
import { Like } from './LikeModel';

interface Post {
  id?: number | undefined;
  content?: string | undefined;
  image?: string | undefined;
  authorId: number;
  likes?: number | undefined;
  likedBy?: Like[] | undefined;
}

const Post: z.ZodType<Post> = z.object({
  id: z.number().optional(),
  content: z.string().optional(),
  image: z.string().optional(),
  authorId: z.number(),
  likes: z.number().optional(),
  likedBy: z.array(Like).optional(),
});

export { Post };
