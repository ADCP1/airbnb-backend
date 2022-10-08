import { Token } from './token.entity';

export interface ITokenRepository {
  save(token: Token): Promise<void>;
  findOneByKey(key: string): Promise<Token | undefined>;
  deleteOneByKey(key: string): Promise<void>;
}
