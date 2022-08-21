import express, { urlencoded, json } from 'express';
import cors from 'cors';
import api from '@/api';

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/api', api);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
