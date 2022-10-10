import { UserProfileDto } from '@application/dtos/request';

import { User } from './user.entity';

export interface IUserRepository {
  save(user: User): Promise<void>;
  findOneByEmail(email: string): Promise<User | undefined>;
  update(userDto: UserProfileDto): Promise<User>;
}
