import { User } from './user.entity';

export interface IUserRepository {
  save(user: User): Promise<void>;
  findOneByUsername(username: string): Promise<User | undefined>;
}
