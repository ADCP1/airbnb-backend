import { ITokenRepository, Token } from '@domain/token';
import { TokenDoc } from './token.doc';

class TokenRepository implements ITokenRepository {
  public async save(token: Token) {
    const tokenId = (
      await TokenDoc.findOne({
        key: token.key,
      })
    )?._id;

    await new TokenDoc({
      _id: tokenId,
      ...token,
    });
  }

  public async findOneByKey(key: string): Promise<Token | undefined> {
    const token = await TokenDoc.findOne({
      key,
    });
    if (!token) return undefined;
    return new Token({
      key: token.key,
      value: token.value,
    });
  }

  public async deleteOneByKey(key: string) {
    await TokenDoc.remove({
      key,
    });
  }
}

export const tokenRepository: ITokenRepository = new TokenRepository();