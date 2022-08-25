import getPosts from './posts';
import postPost from './new';
import { Router } from 'express';

const posts = Router();

posts.get('/', getPosts);
posts.post('/new', postPost);

export default posts;
