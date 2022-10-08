import dotenv from 'dotenv';

type Config = {
  port: number;
  tokenKey: string;
  refreshTokenKey: string;
  tokenLifeMinutes: number;
  refreshTokenLifeMinutes: number;
  mongoUri: string;
};

dotenv.config();

export const config: Config = {
  port: Number(process.env.PORT) || 8080,
  tokenKey: process.env.TOKEN_KEY,
  refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
  tokenLifeMinutes: Number(process.env.TOKEN_LIFE_MINUTES),
  refreshTokenLifeMinutes: Number(process.env.REFRESH_TOKEN_LIFE_MINUTES),
  mongoUri: process.env.MONGO_URI,
};
