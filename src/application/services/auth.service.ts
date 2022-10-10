import { config } from '@config';
import { ITokenRepository, Token } from '@domain/token';
import { tokenRepository } from '@infra/token';
import { UnauthorizedException } from '@shared';
import jwt from 'jsonwebtoken';
import passwordHash from 'password-hash';
import { v1 } from 'uuid';

interface IAuthService {
  generateJWT(receivedRefreshToken: string): Promise<string>;
  generateTokens(
    username: string,
  ): Promise<{ token: string; refreshToken: string }>;
  deleteRefreshToken(username: string): Promise<void>;
  hashPassword(password: string): string;
  isValidPassword(password: string, hashedPassword: string): boolean;
}

class AuthService {
  private tokenRepository: ITokenRepository;

  constructor(tokenRepository: ITokenRepository) {
    this.tokenRepository = tokenRepository;
  }

  public async generateJWT(receivedRefreshToken: string): Promise<string> {
    const refreshTokenData = jwt.verify(
      receivedRefreshToken,
      config.refreshTokenKey,
    ) as { username: string; uuid: string };
    if (!refreshTokenData) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const storedRefreshToken = await this.tokenRepository.findOneByKey(
      refreshTokenData.username,
    );
    if (!storedRefreshToken) {
      throw new UnauthorizedException('Refresh token does not exist');
    }
    if (storedRefreshToken.value !== receivedRefreshToken) {
      throw new UnauthorizedException('Refresh token not related to user');
    }
    return jwt.sign(
      { username: refreshTokenData.username, uuid: v1() },
      config.tokenKey,
      {
        expiresIn: `${config.tokenLifeMinutes * 60}s`,
      },
    );
  }

  public async generateTokens(username: string): Promise<{
    token: string;
    refreshToken: string;
  }> {
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
    await this.tokenRepository.save(refreshToken);
    return { token, refreshToken: refreshTokenValue };
  }

  public async deleteRefreshToken(username: string) {
    return this.tokenRepository.deleteOneByKey(username);
  }

  public hashPassword(password: string): string {
    return passwordHash.generate(password, {
      algorithm: 'sha256',
      iterations: 5,
      saltLength: 10,
    });
  }

  public isValidPassword(password: string, hashedPassword: string): boolean {
    return passwordHash.verify(password, hashedPassword);
  }
}

const authService: IAuthService = new AuthService(tokenRepository);

export { authService, IAuthService };
