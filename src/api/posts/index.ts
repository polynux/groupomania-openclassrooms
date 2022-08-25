import getPosts from './posts';
import postPost from './new';
import putPost from './edit';
import { Router } from 'express';

const posts = Router();

posts.get('/', getPosts);
posts.post('/new', postPost);
posts.put('/edit/:id', putPost);

export default posts;
