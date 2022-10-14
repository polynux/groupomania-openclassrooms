import { Router } from 'express';
import posts from './posts';
import auth from './auth';
import me from './me';
import users from './users';

const api = Router();

api.use('/posts', posts);
api.use('/auth', auth);
api.use('/me', me);
api.use('/users', users);

export default api;
