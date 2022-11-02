import dotenv from 'dotenv';

export class MissingConfigValueException extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, MissingConfigValueException.prototype);
  }
}

type Config = {
  port: number;
  tokenKey: string;
  refreshTokenKey: string;
  tokenLifeMinutes: number;
  refreshTokenLifeMinutes: number;
  mongoUri: string;
};

dotenv.config();

function getConfigValue(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new MissingConfigValueException(
      `Missing config value for attribute ${key}`,
    );
  }
  return value;
}

export const config: Config = {
  port: Number(process.env.PORT) || 8080,
  tokenKey: getConfigValue('TOKEN_KEY'),
  refreshTokenKey: getConfigValue('REFRESH_TOKEN_KEY'),
  tokenLifeMinutes: Number(getConfigValue('TOKEN_LIFE_MINUTES')),
  refreshTokenLifeMinutes: Number(getConfigValue('REFRESH_TOKEN_LIFE_MINUTES')),
  mongoUri: getConfigValue('MONGO_URI'),
};
