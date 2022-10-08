import { ITokenRepository, Token } from '@domain/token';

// TODO this is an in-memory implementation, we should replace this with a Mongo or SQL one

class TokenRepository implements ITokenRepository {
  private tokens: Token[];

  constructor() {
    this.tokens = [];
  }

  public save(token: Token) {
    const { key } = token;
    const tokenIdx = this.tokens.findIndex((t) => t.key === key);
    if (tokenIdx !== -1) {
      this.tokens[tokenIdx] = token;
    } else {
      this.tokens.push(token);
    }
  }

  public findOneByKey(key: string): Token | undefined {
    return this.tokens.find((token) => token.key === key);
  }

  public deleteOneByKey(key: string) {
    const tokenIdx = this.tokens.findIndex((token) => token.key === key);
    if (tokenIdx !== -1) {
      this.tokens.splice(tokenIdx, 1);
    }
  }
}

export const tokenRepository: ITokenRepository = new TokenRepository();
