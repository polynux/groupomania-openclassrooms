import { Router } from 'express';
import login from './login';

const auth = Router();

auth.use('/login', login);

export default auth;
