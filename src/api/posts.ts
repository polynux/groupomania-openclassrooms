import { Router } from 'express';

const posts = Router();

posts.get('/', (req, res) => {
  res.send('Hello World!');
});

export default posts;
