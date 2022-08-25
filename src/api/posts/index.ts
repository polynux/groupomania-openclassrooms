import { Router } from 'express';
import getPosts from './getPosts';
import postPost from './newPost';
import putPost from './editPost';
import deletePost from './deletePost';
import likePost from './likePost';
import unlikePost from './unlikePost';

const posts = Router();

posts.get('/', getPosts);
posts.post('/new', postPost);
posts.put('/edit/:id', putPost);
posts.delete('/delete/:id', deletePost);
posts.put('/like/:id', likePost);
posts.put('/unlike/:id', unlikePost);

export default posts;
