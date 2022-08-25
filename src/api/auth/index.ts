import { Router } from 'express';
import login from './login';
import signup from './signup';

const auth = Router();

auth.post('/login', login);
auth.post('/signup', signup);

export default auth;
