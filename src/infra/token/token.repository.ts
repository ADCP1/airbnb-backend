import { ITokenRepository, Token } from '@domain/token';
import { loadObjectIdentification } from '@infra/identification';
import cloneDeep from 'clone-deep';

import { TokenDoc } from './token.doc';

class TokenRepository implements ITokenRepository {
  public async save(token: Token) {
    loadObjectIdentification(token);
    await TokenDoc.updateOne(
      { key: token.key },
      { $set: cloneDeep({ ...token }) },
      { upsert: true },
    );
  }

  public async findOneByKey(key: string): Promise<Token | null> {
    const token = await TokenDoc.findOne({
      key,
    });
    if (!token) return null;
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
