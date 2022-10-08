import { ITokenRepository, Token } from '@domain/token';
import { tokenRepository } from '@infra';
import jwt from 'jsonwebtoken';
import { v1 } from 'uuid';
import { config } from '@config';

interface AuthService {
  generateJWT(receivedRefreshToken: string): string;
  generateTokens(username: string): void;
  deleteRefreshToken(username: string): void;
  hashPassword(password: string): string;
}

class CAuthService {
  private tokenRepository: ITokenRepository;

  constructor(tokenRepository: ITokenRepository) {
    this.tokenRepository = tokenRepository;
  }

  public generateJWT(receivedRefreshToken: string): string {
    const refreshTokenData = jwt.verify(
      receivedRefreshToken,
      config.refreshTokenKey,
    ) as { username: string; uuid: string };
    if (!refreshTokenData) {
      throw new Error('Invalid refresh token');
    }
    const storedRefreshToken = this.tokenRepository.findOneByKey(
      refreshTokenData.username,
    );
    if (!storedRefreshToken) {
      throw new Error('Refresh token does not exist');
    }
    if (storedRefreshToken.value !== receivedRefreshToken) {
      throw new Error('Refresh token not related to user');
    }
    return jwt.sign(
      { username: refreshTokenData.username, uuid: v1() },
      config.tokenKey,
      {
        expiresIn: `${config.tokenLifeMinutes * 60}s`,
      },
    );
  }

  public generateTokens(username: string) {
    const token = jwt.sign({ username, uuid: v1() }, config.tokenKey, {
      expiresIn: `${config.tokenLifeMinutes * 60}s`,
    });
    const refreshTokenValue = jwt.sign(
      { username, uuid: v1() },
      config.refreshTokenKey,
      {
        expiresIn: `${config.refreshTokenLifeMinutes * 60}s`,
      },
    );
    const refreshToken = new Token({
      key: username,
      value: refreshTokenValue,
    });
    this.tokenRepository.save(refreshToken);
    return { token, refreshTokenValue };
  }

  public deleteRefreshToken(username: string) {
    this.tokenRepository.deleteOneByKey(username);
  }

  public hashPassword(password: string): string {
    return password;
  }
}

const authService: AuthService = new CAuthService(tokenRepository);

export { AuthService, authService };
