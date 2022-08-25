import { Router } from 'express';
import getPosts from './getPosts';
import postPost from './newPost';
import putPost from './editPost';
import deletePost from './deletePost';

const posts = Router();

posts.get('/', getPosts);
posts.post('/new', postPost);
posts.put('/edit/:id', putPost);
posts.delete('/delete/:id', deletePost);

export default posts;
