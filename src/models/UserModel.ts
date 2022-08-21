import { z } from 'zod';

const UserModel = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  role: z.string().default('user'),
  posts: z.array(z.string()).optional(),
});

export default UserModel;
