import { Router } from 'express';
import posts from './posts';
import auth from './auth';

const api = Router();

api.use('/posts', posts);
api.use('/auth', auth);

export default api;
