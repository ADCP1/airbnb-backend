import { User } from './user.entity';

export interface IUserRepository {
  save(user: User): void;
  findOneByUsername(username: string): User | undefined;
}
