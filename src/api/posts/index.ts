import postsRoute from './posts';
import createPost from './new';
import { Router } from 'express';

const posts = Router();

posts.get('/', postsRoute);
posts.post('/new', createPost);

export default posts;
