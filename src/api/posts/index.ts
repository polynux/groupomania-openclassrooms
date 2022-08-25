import getPosts from './getPosts';
import postPost from './newPost';
import putPost from './editPost';
import { Router } from 'express';

const posts = Router();

posts.get('/', getPosts);
posts.post('/new', postPost);
posts.put('/edit/:id', putPost);

export default posts;
