import { Token } from './token.entity';

export interface ITokenRepository {
  save(token: Token): Promise<void>;
  findOneByKey(key: string): Promise<Token | null>;
  deleteOneByKey(key: string): Promise<void>;
}
