import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { snakeToCamelcaseKeys } from './shared';
import { config } from './config';
import { registerRouters } from './controllers';

const app = express();

app.use(cors());
app.use(express.json());
app.use(snakeToCamelcaseKeys());

registerRouters(app);

app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`);
});
