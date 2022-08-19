import { Router } from 'express';
import login from './login';
import signup from './signup';

const auth = Router();

auth.use('/login', login);
auth.use('/signup', signup);

export default auth;
