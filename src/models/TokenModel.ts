import { z } from 'zod';

interface Token {
  id: number;
  userId: number;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

const Token: z.ZodType<Token> = z.object({
  id: z.number(),
  userId: z.number(),
  token: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export { Token };
