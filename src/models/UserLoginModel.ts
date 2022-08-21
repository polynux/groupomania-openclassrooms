import { z } from 'zod';

const UserLoginModel = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default UserLoginModel;
