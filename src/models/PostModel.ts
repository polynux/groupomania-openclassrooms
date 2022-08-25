import { z } from 'zod';

interface Post {
  id?: number | undefined;
  content?: string | undefined;
  image?: string | undefined;
  authorId: number;
}

const Post: z.ZodType<Post> = z.object({
  id: z.number().optional(),
  content: z.string().optional(),
  image: z.string().optional(),
  authorId: z.number(),
});

export { Post };
