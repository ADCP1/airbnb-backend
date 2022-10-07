import dotenv from 'dotenv';

type Config = {
  port: number;
  tokenKey: string;
  refreshTokenKey: string;
  tokenLifeMinutes: number;
  refreshTokenLifeMinutes: number;
};

dotenv.config();

export const config: Config = {
  port: Number(process.env.PORT) || 8080,
  tokenKey: process.env.TOKEN_KEY as string,
  refreshTokenKey: process.env.REFRESH_TOKEN_KEY as string,
  tokenLifeMinutes: Number(process.env.TOKEN_LIFE_MINUTES),
  refreshTokenLifeMinutes: Number(process.env.REFRESH_TOKEN_LIFE_MINUTES),
};
