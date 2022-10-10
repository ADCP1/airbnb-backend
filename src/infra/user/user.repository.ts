import { User, IUserRepository } from '@domain/user';
import { DomainException } from '@shared';
import { UserProfileDto } from 'controllers/user/dtos';
import { UserDoc } from './user.doc';

class UserRepository implements IUserRepository {
  public async save(user: User) {
    const userAlreadyExists =
      (await this.findOneByEmail(user.email)) !== undefined;
    if (!userAlreadyExists) {
      await new UserDoc({ ...user }).save();
    } else {
      throw new DomainException('A user with that email already exists');
    }
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await UserDoc.findOne({
      email,
    });
    if (!user) return undefined;
    return new User(user);
  }

  public async update(user: UserProfileDto): Promise<User> {
    const filter = { email: user.email };
    return UserDoc.findOneAndUpdate(filter, user, {
      new: true,
    });
  }
}

export const userRepository: IUserRepository = new UserRepository();
