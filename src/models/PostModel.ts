import { z } from 'zod';

interface Post {
  id: number;
  title: string;
  content?: string | undefined;
  picture?: string | undefined;
  authorId: number;
}

const Post: z.ZodType<Post> = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string().optional(),
  picture: z.string().optional(),
  authorId: z.number(),
});

export { Post };
