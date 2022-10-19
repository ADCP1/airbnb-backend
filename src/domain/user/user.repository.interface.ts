import { User } from './user.entity';

export interface IUserRepository {
  save(user: User): Promise<void>;
  findOneByEmail(email: string): Promise<User | null>;
}
