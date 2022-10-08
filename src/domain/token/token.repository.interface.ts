import { Token } from './token.entity';

export interface ITokenRepository {
  save(token: Token): void;
  findOneByKey(key: string): Token | undefined;
  deleteOneByKey(key: string): void;
}
