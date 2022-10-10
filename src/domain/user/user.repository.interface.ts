import { UserProfileDto } from 'application/dtos/request';

import { User } from './user.entity';

export interface IUserRepository {
  save(user: User): Promise<User>;
  findOneByEmail(email: string): Promise<User | undefined>;
}
