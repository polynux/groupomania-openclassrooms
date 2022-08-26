import express, { urlencoded, json } from 'express';
import cors from 'cors';
import api from '@/api';
import { config as envConfig } from 'dotenv';
import { deleteExpiredTokens } from '@/controller/AuthController';
import ms from 'ms';

envConfig();

interface Config {
  [key: string]: string;
}

let config: Config = {};

const checkEnvVars = () => {
  const requiredEnvVars = ['PORT', 'DB_URL', 'JWT_SECRET', 'JWT_EXPIRES_IN'];
  let error: Boolean = false;
  requiredEnvVars.forEach((envVar) => {
    if (process.env[envVar] === undefined) {
      error = true;
      console.log(`${envVar} is undefined`);
    } else {
      config[envVar] = process.env[envVar] as string;
    }
  });
  if (error) {
    process.exit(1);
  }
};

checkEnvVars();
export { config };

const port = process.env.PORT || 5000;
const checkExpiredTokenTimer = ms(process.env.CHECK_EXPIRED_TOKEN_EVERY || '60s');

const app = express();
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/api', api);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

setInterval(() => {
  deleteExpiredTokens()
    .then((e) => {
      console.log(`Deleted ${e.count} expired tokens`);
    })
    .catch((error) => {
      console.log(error);
    });
}, checkExpiredTokenTimer); // 60 seconds
