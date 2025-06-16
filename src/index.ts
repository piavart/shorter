import dotenv from 'dotenv';
import express from 'express';

import { Database } from './config/database';
import { router } from './router';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

(async () => {
  await new Database().connect();

  app.use('/', router);

  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
})();
