import { z } from 'zod';

interface Post {
  id?: number | undefined;
  title: string;
  content?: string | undefined;
  image?: string | undefined;
  authorId: number;
}

const Post: z.ZodType<Post> = z.object({
  id: z.number().optional(),
  title: z.string(),
  content: z.string().optional(),
  image: z.string().optional(),
  authorId: z.number(),
});

export { Post };
