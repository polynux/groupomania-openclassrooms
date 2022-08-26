import express, { urlencoded, json } from 'express';
import cors from 'cors';
import api from '@/api';
import { config } from 'dotenv';

config();

const checkEnvVars = () => {
  const requiredEnvVars = ['PORT', 'DB_URL', 'JWT_SECRET', 'JWT_EXPIRES_IN'];
  let error: Boolean = false;
  requiredEnvVars.forEach((envVar) => {
    if (process.env[envVar] === undefined) {
      error = true;
      console.log(`${envVar} is undefined`);
    }
  });
  if (error) {
    process.exit(1);
  }
};

checkEnvVars();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/api', api);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
